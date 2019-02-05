import React, { Component } from 'react'
import { replace, show } from 'actions'

export default class ImageEditor extends Component {
	render () {
    const { src, display, height, width, col, colsm, colmd } = this.props.params, { variables } = this.props.store;
    var source = replace(src, variables, true);
    //'ancho exacto', 'alto exacto', 'alto y ancho exacto'
    var moreParams = {
      height: display === 'alto exacto' || display === 'alto y ancho exacto' ? height : undefined,
      width: display === 'ancho exacto' || display === 'alto y ancho exacto' ? width : undefined,
      className: display === 'auto' ? 'img-responsive' : undefined
    };
		return (
			<div className={`col-${col} col-sm-${colsm} col-md-${colmd}`}>
        <h5>Imagen:</h5>
        <h5>src: </h5>
        <img src={source} {...moreParams} />
      </div>
		)
	}
}