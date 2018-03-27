import { FUNCIONES } from 'components'
import $, { date } from 'actions'
import { data } from 'stores'

export function exe(action, state) {
	const { code, path, update } = state, base = data.child(code.concat('/', path))
	switch(action) {
		case 'CREATE': {
			const { feedback, fn, md, sm, xs, params, tag } = state
			$('btn-save').setAttribute('disabled', 'true')
			base.once('value').then(snap => {
				let ref = base.push(), position = snap.val().count
				ref.update({ date:date(), function:fn, params, position, tag, width:{md, sm, xs} }).then(() => {
					base.update({ count:position + 1 }).then(() => {
						if (path == 'answers') { ref.update({ feedback:feedback }) }
					})				
				})
			})
			break
		}
		case 'READ': {
			base.orderByChild('position').once('value').then(snap => {
				let functions = []						
				snap.forEach(f => {
					if (f.hasChild('function') && f.hasChild('params') && f.hasChild('position'))
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
		    				ref.remove().then(() => {
		    					base.once('value').then(c => {
		    						base.update({ count:c.val().count - 1 })
		    					})
		    				})
		    			}
		    		})
		    	})
			})	
			break
		}
		case 'PRINT': {
			const { container, variables, versions, vt } = state
			state[path].forEach((m, i) => {
				let j = FUNCIONES.findIndex(x => x.tag == m.tag)
				let k = FUNCIONES[j].fns.findIndex(x => x.id == m.function)
				FUNCIONES[j].fns[k].action({
					container:$(`${container}-${i}`), params:m.params, variables, versions, vt
				})
			}) 	
			break
		}
		case 'CLONE': {
			const { target } = state
			base.once('value').then(snap => {
				let ref = base.push(), position = snap.val().count
				ref.update({ ...JSON.parse(target), date:date(), position }).then(() => {
					base.update({ count:position + 1 })
				})
			})	
			break
		}
		case 'MOVE': {
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
		    			else if (k == i) {ref.update({ position:f }) }
		    		})
		    	})
		    }
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
	}
}