function hellowWorldButton() {
  const [isClick, setClickState] = React.useState(false)
  return React.createElement('button', { onClick: () => {} }, 'Hello world!')
}
const rootContainer = document.getElementById('react-root')
ReactDOM.render(React.createElement(hellowWorldButton), rootContainer)

const Navbar = ({ title }) => {
  return (
    <nav>
      <h1>{title}</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar
