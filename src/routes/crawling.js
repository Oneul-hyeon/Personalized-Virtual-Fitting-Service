const axios = require('axios')
const cheerio = require('cheerio')

const getHtml = async (url) => {
  try {
    const response = await axios.get(url)
    return { success: true, code: 'FETCH_DONE', data: response.data }
  } catch (error) {
    return { success: false, code: error.code, errno: error.errno }
  }
}

// 60.jpg -> 500.jpg로 바꾸기 위한 함수
// 뒤부터 문자열 탐색 후 교체
function replaceLastOccurrence(str, find, replace) {
  const lastIndex = str.lastIndexOf(find)
  if (lastIndex === -1) {
    return str
  }
  const before = str.substring(0, lastIndex)
  const after = str.substring(lastIndex + find.length)
  return before + replace + after
}

// 무신사용 크롤러
const extractImgSrcFromMusinsa = (html) => {
  let imageSrcList = []
  const $ = cheerio.load(html)

  $('ul.product_thumb img').each((index, element) => {
    const src = $(element).attr('src')
    if (checkImageExtension(src)) {
      const modifiedSrc = 'https:' + replaceLastOccurrence(src, '60', '500')
      imageSrcList.push(modifiedSrc)
    }
  })

  $('div.detail_product_info_item img').each((index, element) => {
    const src = $(element).attr('src')
    // 상품 상세보기 페이지의 이미지는 확장자 없는 경우도 있음...
    // if (!checkImageExtension(src)) {
    //   return true
    // }
    if (!src.startsWith('//')) {
      imageSrcList.push(src)
    }
  })

  return imageSrcList
}

// 일반 웹사이트용 크롤러
const extractImgSrc = (html) => {
  let imageSrcList = []
  const $ = cheerio.load(html)

  $('img').each((index, element) => {
    const src = $(element).attr('src')
    if (!checkImageExtension(src)) {
      return true
    }
    if (src.startsWith('//')) {
      imageSrcList.push('https:' + src)
    } else if (!src.startsWith(':data')) {
      imageSrcList.push(src)
    }
  })

  return imageSrcList
}

// 파일 이름이 이미지 확장자인지 확인
function checkImageExtension(url) {
  // const imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i
  const imageExtensions = /\.(jpg|jpeg|png)$/i
  return imageExtensions.test(url)
}

// 메인 크롤러
const getClothesImageUrls = async (url) => {
  // http로 시작하는지 체크
  if (!url.startsWith('http')) {
    return { success: false, code: 'URL_ERROR_HTTP', errno: -1 }
  }

  // 이미지의 url을 바로 올렸을 경우 체크
  if (checkImageExtension(url)) {
    const response = await axios.get(url)
    if (response.status === 200) {
      return { success: true, code: 'FETCH_DONE', urls: [url] }
    } else {
      return { success: false, code: 'URL_ERROR_INVALID_IMAGE', errno: -1 }
    }
  }
  const result = await getHtml(url)
  if (!result.success) {
    return result
  }
  const html = result.data
  if (url.includes('musinsa')) {
    const imageSrcList = extractImgSrcFromMusinsa(html)
    return { success: true, code: 'FETCH_DONE', urls: imageSrcList, errno: 0 }
  } else {
    const imageSrcList = extractImgSrc(html)
    return { success: true, code: 'FETCH_DONE', urls: imageSrcList, errno: 0 }
  }
}

module.exports = { getClothesImageUrls }
