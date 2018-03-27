import { FUNCIONES } from 'components'
import $, { date } from 'actions'
import { data } from 'stores'

export function ejercicios(action, state) {
	switch(action) {
		case 'GET': {
			const { container, path, variables, versions, vt } = state
			state[path].forEach((m, i) => {
				let j = FUNCIONES.findIndex(x => x.tag == m.tag)
				let k = FUNCIONES[j].fns.findIndex(x => x.id == m.function)
				FUNCIONES[j].fns[k].action({
					container:$(`${container}-${i}`), params:m.params, variables:variables, versions:versions, vt:vt
				})
			}) 	
			break
		}
		case 'ADD': {
			const { code, feedback, fn, params, path, tag, md, sm, xs } = state
			$('btn-save').setAttribute('disabled', 'true')
			data.child(`${code}/${path}`).once('value').then(snap => {
				let count = snap.val().count
				let ref = data.child(`${code}/${path}`).push()
				ref.update({ 
					function:fn, params:params, date:date(), tag:tag, position:count, width:{md, sm, xs}
				}).then(() => {
					data.child(`${code}/${path}`).update({ count:count+1 })
					if (path == 'answers')
						ref.update({ feedback:feedback })
				})
			})
			break
		}
		case 'UPDATE': {
			const { code, id, params, path } = state
			$('btn-save').setAttribute('disabled', 'true')
			data.child(`${code}/${path}/${id}`).update({ params:params, date:date() })
			break
		}
		case 'REMOVE': {
			const { code, id, path } = state
			data.child(`${code}/${path}/${id}`).once('value').then(t => {
				let i = t.val().position
					data.child(`${code}/${path}/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let f = fn.val().position
		    			if (i < f && state[path].length) {
		    				data.child(`${code}/${path}/${fn.key}`).update({ position:f - 1 })
		    			} else if (i == f) {
		    				data.child(`${code}/${path}/${fn.key}`).remove().then(() => {
		    					data.child(`${code}/${path}`).once('value').then(c => {
		    						data.child(`${code}/${path}`).update({ count:c.val().count - 1 })
		    					})
		    				})
		    			}
		    		})
		    	})
			})	
			break
		}
		case 'MOVE': {
			const { code, path, i, f } = state
			if (i < f) {
		    	data.child(`${code}/${path}/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position
		    			if (k <= f && k > i) {
		    				data.child(`${code}/${path}/${fn.key}`).update({ position:k - 1 })
		    			} else if (k == i) {
		    				data.child(`${code}/${path}/${fn.key}`).update({ position:f })
		    			}
		    		})
		    	})
		    } else if (i > f) {
		    	data.child(`${code}/${path}/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position
		    			if (k >= f && k < i) {
		    				data.child(`${code}/${path}/${fn.key}`).update({ position:k + 1 })
		    			} else if (k == i) {
		    				data.child(`${code}/${path}/${fn.key}`).update({ position:f })
		    			}
		    		})
		    	})
		    }
			break
		}
		case 'CLONE': {
			const { code, path, target } = state
			data.child(`${code}/${path}`).once('value').then(snap => {
				let count = snap.val().count
				let ref = data.child(`${code}/${path}/`).push()
				ref.update({...JSON.parse(target)}); ref.update({ position:count, date:date() }).then(() => {
					data.child(`${code}/${path}`).update({ count:count+1 })
				})
			})	
			break
		}
		case 'COUNT': {
			const { code, path } = state
			data.child(`${code}/${path}`).once('value').then(snap => {
				if (!snap.hasChild('count')) {
					data.child(`${code}/${path}`).update({ count:0 })
				}
			})
			break
		}
	}
}