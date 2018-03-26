export * from './variables'
export * from './ejercicios'
export * from './versiones'

import { data } from 'stores'

export function code(action, state) {
	switch(action) {
		case 'GET': {
			const { target, update } = state
			let search = []
			data.once('value').then(snap => {
				snap.forEach(c => {
					if (c.key.toString().includes(target)) {
						let t = 0, l = 0, v = 0
						if (c.hasChild('versions')) {
							let m = c.val().versions; v = m.selected; t = m.total; l = m.limit
						}
						search.push({ id:c.key, total:t, limit:l, versions:v })
						update({ search:search })
					}
				})
			})	
		}
	}
}