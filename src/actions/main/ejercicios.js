import { FUNCIONES } from 'components'
import { data, DEVICES, LABELS } from 'stores'
import $, { date } from 'actions'
import React from 'react'

export function exe(action, state) {
	const { code, path, update } = state, base = data.child(code.concat('/', path))
	switch(action) {
		case 'CREATE': {
			const { feedback, fn, md, sm, xs, params, tag } = state
			$('btn-save').setAttribute('disabled', 'true')
			base.once('value').then(snap => {
				let ref = base.push(), position = snap.val().count
				ref.update({ date:date(), name:fn, params, position, tag, width:{md, sm, xs} }).then(() => {
					base.update({ count:position + 1 }).then(() => { if (path == 'answers') { ref.update({ feedback }) } })				
				})
			})
			break
		}
		case 'READ': {
			base.orderByChild('position').once('value').then(snap => {
				let functions = []						
				snap.forEach(f => {
					if (f.hasChild('name') && f.hasChild('params') && f.hasChild('position'))
						functions.push({ id:f.key, ...f.val(), json:JSON.stringify(f.val()) })
					update({ [path]:functions })
				})
			})
			break
		}
		case 'UPDATE': {
			const { id, params } = state
			$('btn-save').setAttribute('disabled', 'true')
			base.child(id).update({ date:date(), params })
			break
		}
		case 'DELETE': {
			const { id } = state
			base.child(id).once('value').then(t => {
				let i = t.val().position
				base.once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let f = fn.val().position, ref = base.child(fn.key)
		    			if (i < f && state[path].length) { ref.update({ position:f - 1 }) }
		    			else if (i == f) {
		    				ref.remove().then(() => { base.once('value').then(c => { base.update({ count:c.val().count - 1 }) }) })
		    			}
		    		})
		    	})
			})	
			break
		}
		case 'SWITCH': {
			const { i, f } = state
			if (i < f) {
		    	base.once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position, ref = base.child(fn.key)
		    			if (k <= f && k > i) { ref.update({ position:k - 1 }) } 
		    			else if (k == i) { ref.update({ position:f }) }
		    		})
		    	})
		    } else if (i > f) {
		    	base.once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position, ref = base.child(fn.key)
		    			if (k >= f && k < i) { ref.update({ position:k + 1 }) } 
		    			else if (k == i) { ref.update({ position:f }) }
		    		})
		    	})
		    }
			break
		}
		case 'PRINT': {
			const { variables, versions, vt } = state
			state[path].forEach((m, i) => {
				let j = FUNCIONES.findIndex(x => x.tag == m.tag), k = FUNCIONES[j].fns.findIndex(x => x.id == m.name)
				FUNCIONES[j].fns[k].action({ container:$(`${LABELS.CONT[path]}-${i}`), params:m.params, variables, versions, vt })
			}) 	
			break
		}
		case 'CLONE': {
			const { target } = state
			base.once('value').then(snap => {
				let ref = base.push(), position = snap.val().count
				ref.update({ ...JSON.parse(target), date:date(), position }).then(() => { base.update({ count:position + 1 }) })
			})	
			break
		}
		case 'CHECK': {
			base.once('value').then(snap => {
				if (!snap.hasChild('count')) { base.update({ count:0 }) }
			})
		}
		case 'WIDTH': {
			const { id, value } = state
			if (Number.isInteger(parseInt(value)))
				base.child(`${id}/width`).update({ md:Number(value) })
			break
		}
		case 'GET': {
			const { container, device } = state, fn = state[path]; let count = 0, arr = [], aux = []

			fn.forEach((m, i) => { 
				let size = device <= DEVICES[2].size ? m.width.xs : device <= DEVICES[1].size ? m.width.sm : m.width.md; count += Number(size)
				let component = 
					<div key={i} class={`col-md-${size} col-sm-${m.width.sm} col-sm-${m.width.xs} div-${m.tag} tags`}>
					{
						m.tag != 'general' ? 
						<canvas id={`${container}-${i}`} class="center-block" style={{background:m.params.background, borderRadius:m.params.borderRadius,
							border:`${m.params.borderWidth}px ${m.params.borderStyle} ${m.params.borderColor}`, margin:'0 auto'}}></canvas> :
						<div id={`${container}-${i}`} class="general"></div>
					}
					</div>
				if (count <= 12) {
					aux.push(component)
					if (count == 12 || fn.length == i + 1) {
						arr.push(<div key={`${i}-0`} class="row">{aux}</div>); aux = []; count = 0
					}
				}
				else
				{
					arr.push(<div key={`${i}-0`} class="row">{aux}</div>); aux = []; count = size
					aux.push(component)
					if (fn.length == i + 1)
						arr.push(<div key={`${i}-1`} class="row">{aux}</div>)
				}
			})
			return arr
		}
	}
}