import './Content.css'
import photo1 from '../../images/photo1.png'
import photo2 from '../../images/photo2.png'
import photo3 from '../../images/photo3.png'
import photo4 from '../../images/photo4.png'
import photo5 from '../../images/photo5.png'
import sizeListIcon1 from '../../images/sizeListIcon1.png'
import sizeListIcon2 from '../../images/sizeListIcon2.png'
import GrayButton from './GrayButton'
import { Link } from 'react-router-dom'

function Content() {
  return (
    <div className="mainPageContent">
      <section className="homeMainSection">
        <div className="homeMainContent">
          <div className="mainPageImg">
            <img src={photo1} alt="Img 1" />
          </div>
          <div className="textContent">
            <div className="sectionTitle">
              <h1>
                당신의 AI 핏 <br></br>
                어드바이저
              </h1>
            </div>
            <div className="text">
              <p>옷, 현명하게 구매하세요.</p>
              <p>AI가 당신의 사이즈를 측정하고,</p>
              <p>옷을 입은 예상 모습까지 보여드립니다.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="homeMainSection">
        <div className="homeMainContentReverse">
          <div className="textContent">
            <div className="sectionTitle">
              <h1>집에서 피팅</h1>
            </div>
            <div className="text">
              <p>매장을 번거롭게 방문하지 마세요.</p>
              <p>집에서 편하게 입혀보세요.</p>
              <p>가상 피팅으로 당신의 시간을 절약하세요.</p>
            </div>
            <GrayButton as={Link} to="/fitting" className="mainButton">
              온라인 피팅
            </GrayButton>
          </div>

          <div className="mainPageImgReverse">
            <img src={photo2} alt="Img 2" />
          </div>
        </div>
      </section>
      <section className="homeMainSection">
        <div className="homeMainContent">
          <div className="mainPageImg">
            <img src={photo3} alt="Img 3" />
          </div>
          <div className="textContent">
            <div className="sectionTitle">
              <h1>사이즈 추천</h1>
            </div>
            <div className="text">
              <p>사이즈,</p>
              <p>더 이상 고민하지 마세요.</p>
              <p>AI가 스마트하게 당신에게 최적의 사이즈를 추천합니다.</p>
            </div>
            <ul className="sizeList">
              <li className="sizeListItem">
                <div className="sizeListIcon1">
                  <img src={sizeListIcon1} alt="Icon1" />
                </div>
                <div className="sizeListTitle">사이즈 조언</div>
                <div className="sizeListText">최적의 사이즈를 추천합니다.</div>
              </li>
              <li className="sizeListItem">
                <div className="sizeListIcon2">
                  <img src={sizeListIcon2} alt="Icon2" />
                </div>
                <div className="sizeListTitle">핏 예측</div>
                <div className="sizeListText">
                  사이즈 별 예상 핏을 알려드립니다.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="homeMainSection">
        <div className="homeMainContentReverse">
          <div className="textContent">
            <div className="sectionTitle">
              <h1>코디 추천</h1>
            </div>
            <div className="text">
              <p>무슨 옷을 살지 고민이신가요?</p>
              <p>당신에게 맞는, 최적의 코디를 추천해드립니다.</p>
            </div>
            <GrayButton as={Link} to="/recommend" className="mainButton">
              코디 추천
            </GrayButton>
          </div>
          <div className="mainPageImgReverse">
            <img src={photo4} alt="Img 4" />
          </div>
        </div>
      </section>
      <section className="homeMainSection">
        <div className="homeMainContent">
          <div className="mainPageImg">
            <img src={photo5} alt="Img 5" />
          </div>
          <div className="textContent">
            <div className="sectionTitle">
              <h1>패션 인사이트</h1>
            </div>
            <div className="text">
              <p>당신의 멋진 감각을 공유하세요.</p>
            </div>
            <GrayButton as={Link} to="outfitforum" className="mainButton">
              코디 공유
            </GrayButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Content
