import './Content.css'
import photo1 from '../images/photo1.png'
import photo2 from '../images/photo2.png'
import photo3 from '../images/photo3.png'
import photo4 from '../images/photo4.png'
import photo5 from '../images/photo5.png'

function Content() {
  return (
    <div>
      <div className="mainContainer">
        <div className="photo">
          <img src={photo1} alt="Photo 1" />
        </div>
        <div className="text">
          <p>ㅇㅇㅇㅇ장의 데이터로 학습한 AI</p>
          <p>실착한 핏을 온라인에서 쉽고 편안하게 확인</p>
          <p>당신의 AI 핏 어드바이저</p>
        </div>
      </div>
      <div className="mainContainer">
        <div className="text">
          <p>매장을 번거롭게 방문하지 마세요.</p>
          <p>집에서 편하게 입혀보세요.</p>
          <p>가상 피팅으로 당신의 시간을 절약하세요.</p>
        </div>
        <div className="photo">
          <img src={photo2} alt="Photo 2" />
        </div>
      </div>
      <div className="mainContainer">
        <div className="photo">
          <img src={photo3} alt="Photo 3" />
        </div>
        <div className="text">
          <p>사이즈,</p>
          <p>더 이상 고민하지 마세요.</p>
          <p>AI가 스마트하게 당신에게 최적의 사이즈를 추천합니다.</p>
        </div>
      </div>
      <div className="mainContainer">
        <div className="text">
          <p>무슨 옷을 살지 고민이신가요?</p>
          <p>당신에게 맞는, 최적의 코디를 추천해드립니다.</p>
        </div>
        <div className="photo">
          <img src={photo4} alt="Photo 4" />
        </div>
      </div>
      <div className="mainContainer">
        <div className="photo">
          <img src={photo5} alt="Photo 5" />
        </div>
        <div className="text">
          <p>당신의 멋진 감각을 공유하세요.</p>
        </div>
      </div>
    </div>
  )
}

export default Content
