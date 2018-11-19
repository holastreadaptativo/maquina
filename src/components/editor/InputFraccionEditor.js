import React, { Component } from 'react'
import { replace, show } from 'actions'

export default class InputEditor extends Component {
	render () {
		const { entero, numerador, denominador } = this.props.params;
		return (
			<div class="col-8 col-sm-6 col-md-4">
        <table>
          <tbody><tr>
              <td rowSpan="2">
                <input type="text" id="entero" name="answer" class="input-numerador" placeholder={entero} />
              </td>
              <td style={{borderBottom: '2px solid black'}}>
                <input type="text" id="numerador" name="answer" class="input-num-y-den" placeholder={numerador} />
              </td>
            </tr>
            <tr>
              <td>
                <input type="text" id="denominador" name="answer" class="input-num-y-den" placeholder={denominador}/>
              </td>
            </tr>
          </tbody>
				</table>
				<div>{ this.getFeed() }</div>
			</div>
		)
	}
	getFeed() {
		const { feedback } = this.props;
		return (
			<div class="feed">
				<h6><b>Feedback: </b>{ feedback ? feedback : 'Vacío' }</h6>
			</div>
		)
	}
}