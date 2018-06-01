//import { replace } from 'actions'

export function sucesiones(config) 
{
	const { container, params, variables, versions, vt } = config
	const { cols, rows } = params

    if (!container) return
    let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
        width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

    container.height = height
    container.width = width

    let state = {
    	ctx:container.getContext('2d'), h:height/rows, w:width/cols, height, width, params
    }

    generarPlanoCartesiano(state)
    generarSucesionNumerica(state)

    function generarPlanoCartesiano(state) {
		const { ctx, params, height, width, h, w } = state

		ctx.clearRect(0, 0, width, height)
		ctx.beginPath()

		for (let x = w; x < width; x += w) {
	     	ctx.moveTo(x, 0)
	     	ctx.lineTo(x, height)
		}
		for (let y = h; y < height; y += h) {
	    	ctx.moveTo(0, y)
	    	ctx.lineTo(width, y)
		}

		ctx.strokeStyle = params.gridColor
		ctx.lineWidth = params.gridWidth

		ctx.stroke()
		ctx.closePath()
	}

	function generarSucesionNumerica(state) {
		const { ctx, params, height, width, h, w } = state

		ctx.beginPath()

		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.font = 'bold 13px arial'
		ctx.lineWidth = '1px'

		for (let y = h/2, i = Number(params.base); y < height; y += h) {
			for (let x = w/2; x < width; x += w, i += Number(params.range)) {
				try
				{
					let start = Number(params.start)
					for (let k = 0; k < Number(params.items); k++) {
						let serie = params.serie.replace('n', start + k)
						if (eval(serie) == i) {
							ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'
							ctx.fillRect(x - w/2, y - h/2, w, h)
						}
					}
				} catch(e) {}
				finally
				{
					ctx.fillStyle = 'black'
					ctx.fillText(i, x, y)		
				}
	     	}
		}

		ctx.stroke()
		ctx.closePath()
	}
}