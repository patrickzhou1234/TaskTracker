import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ onClear, title, onAdd, showAdd }) => {
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button onClick={onClear} text="Clear All"></Button>
        <Button onClick={onAdd} color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} />
    </header>
  )
}

export default Header
