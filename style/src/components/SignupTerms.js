import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './SignupTerms.css'

function SignupTerms({ onClose, toggleModal }) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleNext = () => {
    if (isChecked) {
      onClose()
      toggleModal()
    }
  }

  return (
    <Modal show={true} onHide={onClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>회원가입 약관</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <em className="emphasis">
            &lt; model.fit &gt;('model.fit'이하 'model.fit')
          </em>
          은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를
          보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기
          위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
        </p>
        <p className="ls2">
          ○ 이 개인정보처리방침은 <em className="emphasis">2023</em>년{' '}
          <em className="emphasis">6</em>월 <em className="emphasis">20</em>
          일부터 적용됩니다.
        </p>
        <br />
        <p className="lh6 bs4">
          <strong>제1조(개인정보의 처리 목적)</strong>
          <br />
          <br />
          <em className="emphasis">
            &lt; model.fit &gt;('model.fit'이하 'model.fit')
          </em>
          은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이
          변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는
          등 필요한 조치를 이행할 예정입니다.
        </p>
        <ul className="list_indent2 mgt10">
          <p className="ls2">1. 홈페이지 회원가입 및 관리</p>
          <p className="ls2">
            회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
            회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의
            개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지 목적으로
            개인정보를 처리합니다.
          </p>
          <br />
          <p className="ls2">2. 재화 또는 서비스 제공</p>
          <p className="ls2">
            서비스 제공, 콘텐츠 제공, 본인인증, 연령인증을 목적으로 개인정보를
            처리합니다.
          </p>
          <br />
        </ul>
        <br />
        <p className="lh6 bs4">
          <strong>제2조(개인정보의 처리 및 보유 기간)</strong>
          <br />
          <br />① <em className="emphasis">&lt; model.fit &gt;</em>은(는) 법령에
          따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
          동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          <br />
          <br />② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
        </p>
        <ul className="list_indent2 mgt10">
          <li className="tt">1.&lt;홈페이지 회원가입 및 관리&gt;</li>
          <li className="tt">
            &lt;홈페이지 회원가입 및 관리&gt;와 관련한 개인정보는 수집.이용에
            관한 동의일로부터&lt;1년&gt;까지 위 이용목적을 위하여
            보유.이용됩니다.
          </li>
          <li>
            보유근거 : 「개인정보보호법」 제15조(개인정보의 수집·이용) 제1항
          </li>
          <li>관련법령 : </li>
          <li>예외사유 : </li>
        </ul>
        <br />
      </Modal.Body>
      <Modal.Footer>
        <div className="btnGroup ac">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span>위 모든 사항에 동의합니다.</span>
          <br />
          <br />
          <Button disabled={!isChecked} onClick={handleNext} variant="primary">
            다음
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default SignupTerms
