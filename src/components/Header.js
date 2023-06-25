import Button from "./Button"

const Header = ({onPress,showAdd}) => {
    const onClick = (e) => { 
        onPress()
    }
  return (
    <div className="header">
        <h1>Task Tracker</h1>
        <Button name={showAdd ? "Close" : "Add"} color={showAdd ? "red" : "green"} onClick={onClick}/>
    </div>
  )
}

export default Header