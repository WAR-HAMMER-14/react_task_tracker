import PropTypes from 'prop-types'
const Button = ({color,name,onClick}) => {
  return (
    <button className="btn" style={{backgroundColor:color}} onClick={onClick}>{name}</button>
  )
}

Button.defaultProps = {
    color:"steelblue",
    name:"Click Me"
}

Button.propTypes = {
    color:PropTypes.string,
    name:PropTypes.string,
    onClick:PropTypes.func
}

export default Button

