import { FUNCIONES } from 'components'
import { data } from 'stores'
import $ from 'actions'

export function ejercicios(action, state) {
	switch(action) {
		case 'GET': {
			const { functions, variables } = state
			functions.forEach((m, i) => {
				let j = FUNCIONES.findIndex(x => x.tag == m.tag)
				let k = FUNCIONES[j].fns.findIndex(x => x.id == m.function)
				FUNCIONES[j].fns[k].action({
					container:$(`container-${i}`), params:m.params, variables:variables
				})
			}) 	
			break;
		}
		case 'ADD': {
			const { code, params, fn, tag } = state
			$('btn-save').setAttribute('disabled', 'true')
			data.child(code).once('value').then(snap => {
				let count = snap.val().count
				data.child(`${code}/functions`).push({ 
					function:fn, params:params, date:(new Date()).toLocaleString(), tag:tag, position:count, width:12
				}).then(() => {
					data.child(code).update({ count:count+1 })
				})
			})
			break;
		}
		case 'UPDATE': {
			const { code, params, id } = state
			$('btn-save').setAttribute('disabled', 'true')
			data.child(`${code}/functions/${id}`).update({
				params:params, date:(new Date()).toLocaleString()
			})
			break;
		}
		case 'REMOVE': {
			const { code, functions, id } = state
			data.child(`${code}/functions/${id}`).once('value').then(t => {
				let i = t.val().position
					data.child(`${code}/functions/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let f = fn.val().position
		    			if (i < f && functions.length) {
		    				data.child(`${code}/functions/${fn.key}`).update({ position:f - 1 })
		    			} else if (i == f) {
		    				data.child(`${code}/functions/${fn.key}`).remove().then(() => {
		    					data.child(code).once('value').then(c => {
		    						data.child(code).update({ count:c.val().count - 1 })
		    					})
		    				})
		    			}
		    		})
		    	})
			})	
			break;
		}
		case 'MOVE': {
			const { code, i, f } = state
			if (i < f) {
		    	data.child(`${code}/functions/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position
		    			if (k <= f && k > i) {
		    				data.child(`${code}/functions/${fn.key}`).update({ position:k - 1 })
		    			} else if (k == i) {
		    				data.child(`${code}/functions/${fn.key}`).update({ position:f })
		    			}
		    		})
		    	})
		    } else if (i > f) {
		    	data.child(`${code}/functions/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position
		    			if (k >= f && k < i) {
		    				data.child(`${code}/functions/${fn.key}`).update({ position:k + 1 })
		    			} else if (k == i) {
		    				data.child(`${code}/functions/${fn.key}`).update({ position:f })
		    			}
		    		})
		    	})
		    }
			break;
		}
	}
}