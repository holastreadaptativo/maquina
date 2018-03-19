import { FUNCIONES } from 'components'
import { data } from 'stores'
import $ from 'actions'

export function respuestas(action, state) {
	switch(action) {
		case 'GET': {
			const { answers, variables, versions, vt } = state
			answers && answers.forEach((m, i) => {
				let j = FUNCIONES.findIndex(x => x.tag == m.tag)
				let k = FUNCIONES[j].fns.findIndex(x => x.id == m.function)
				FUNCIONES[j].fns[k].action({
					container:$(`content-${i}`), params:m.params, variables:variables, versions:versions, vt:vt
				})
			}) 	
			break;
		}
		case 'ADD': {
			const { code, params, fn, tag, md, sm, xs } = state
			$('btn-save').setAttribute('disabled', 'true')
			data.child(code).once('value').then(snap => {
				let idAnsw = snap.val().idAnsw ? snap.val().idAnsw : 0
				data.child(`${code}/answers`).push({ 
					function:fn, params:params, date:(new Date()).toLocaleString(), tag:tag, position:idAnsw, width:{md, sm, xs}
				}).then(() => {
					data.child(code).update({ idAnsw:idAnsw+1 })
				})
			})
			break;
		}
		case 'UPDATE': {
			const { code, params, id } = state
			$('btn-save').setAttribute('disabled', 'true')
			data.child(`${code}/answers/${id}`).update({
				params:params, date:(new Date()).toLocaleString()
			})
			break;
		}
		case 'REMOVE': {
			const { code, answers, id } = state
			data.child(`${code}/answers/${id}`).once('value').then(t => {
				let i = t.val().position
					data.child(`${code}/answers/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let f = fn.val().position
		    			if (i < f && answers.length) {
		    				data.child(`${code}/answers/${fn.key}`).update({ position:f - 1 })
		    			} else if (i == f) {
		    				data.child(`${code}/answers/${fn.key}`).remove().then(() => {
		    					data.child(code).once('value').then(c => {
		    						data.child(code).update({ idAnsw:c.val().idAnsw - 1 })
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
		    	data.child(`${code}/answers/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position
		    			if (k <= f && k > i) {
		    				data.child(`${code}/answers/${fn.key}`).update({ position:k - 1 })
		    			} else if (k == i) {
		    				data.child(`${code}/answers/${fn.key}`).update({ position:f })
		    			}
		    		})
		    	})
		    } else if (i > f) {
		    	data.child(`${code}/answers/`).once('value').then(snap => {
		    		snap.forEach(fn => {
		    			let k = fn.val().position
		    			if (k >= f && k < i) {
		    				data.child(`${code}/answers/${fn.key}`).update({ position:k + 1 })
		    			} else if (k == i) {
		    				data.child(`${code}/answers/${fn.key}`).update({ position:f })
		    			}
		    		})
		    	})
		    }
			break;
		}
	}
}