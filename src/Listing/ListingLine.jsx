import React from 'react'
import PropTypes from 'prop-types'
import {
  TableCell,
  TableRow,
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

import replace from '../utils/replace'


const getCellContent = (content, transformContent, data) => {
  let printableContent = content

  if (content.highlight) {
    printableContent = content.value
  }

  if (typeof transformContent === 'function') {
    printableContent = transformContent(printableContent, data)
  }

  const props = {}

  if (typeof printableContent === 'string' && content.highlight) {
    printableContent = replace(
      printableContent,
      content.highlight,
      key => `<span style="background-color: yellow;">${key}</span>`,
    )

    props.dangerouslySetInnerHTML = {
      __html: printableContent,
    }

    printableContent = undefined
  }

  return {
    content: printableContent,
    props,
  }
}

class ListingLine extends React.Component {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    handleClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    handleCheckClick: PropTypes.func.isRequired,
  }

  renderCells() {
    const { headers, data, handleClick } = this.props

    return headers.map((header) => {
      const {
        content,
        props,
      } = getCellContent(data[header.id], header.transformContent, data)

      return (
        <TableCell
          key={`cell-${(Math.random() * 10000).toFixed(4)}`}
          padding={header.disablePadding ? 'none' : 'default'}
          numeric={header.numeric}
          onClick={() => handleClick(data.id)}
          {...props}
        >
          {content}
        </TableCell>
      )
    })
  }

  render() {
    const {
      data,
      isSelected,
      handleKeyDown,
      handleCheckClick,
    } = this.props

    return (
      <TableRow
        hover
        onKeyDown={event => handleKeyDown(event, data.id)}
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={-1}
        selected={isSelected}
      >
        <TableCell
          padding="checkbox"
          onClick={() => handleCheckClick(data.id)}
        >
          <Checkbox checked={isSelected} />
        </TableCell>

        {this.renderCells()}
      </TableRow>
    )
  }
}

export default ListingLine