var respGeneral = 0, rspMalas = 0, rspSinFeedBack = 0, RespNeg = 0, datos = []; fechaEntrada = (new Date()).toLocaleTimeString()
var idEjercicio = '', nivelF = '', ejeF = '', ieGeneral = '', errFre = '', feed = '', version = '', check = false

window.onload = () => {
	let c = get('data-content'), v = get('data-version'), doc = '', h = ['e', 'r', 'g'], r = $('content'), id = document.body.id,
		pics = ['sDYoR4', 'ePDC7C', '7nyhge', 'KrDnZf', 'mSHQer', '9Tz57g'], p = Math.floor(Math.random(0, 1) * pics.length)
	
	h.forEach(n => { //Crear contenedores de ejercicio
		if (n == 'g') {
			doc += '<div id="glosa" class="filter hidden"><button id="finish" class="wide">'
			doc +='<span class="glyphicon glyphicon-remove-circle"/></button><div class="glosa">'
		}
		//if (n == 'r') c[n] = shuffle(c[n])
		c[n].forEach((m, i) => {
			doc += `<div class="col-md-${m.width.md} col-sm-${m.width.sm} col-xs-${m.width.xs} tag">`
			if (m.tag != 'general') doc += `<canvas id="container-${n}${i}" style="background:${m.params.background}"></canvas>`
			else doc += `<div id="container-${n}${i}" class="general"></div>`
			doc += '</div>'
		})
	}) 

	doc += '</div></div><div id="feedback" class="filter hidden"><div class="feedback"><div id="bubble"><div id="message" class="info"></div>'
	doc += '<button id="close"><span class="glyphicon glyphicon-remove-circle"/></button><div id="feedFlecha"></div></div>'
	doc += '<div id="caption" class="feed" style="background-image:url(https://goo.gl/'+pics[p]+')"></div></div></div>'
	doc += '<script src="jsEjercicios.js"></script>'

	r.innerHTML = doc; idEjercicio = id; nivelF = id.substring(0, 2); ejeF = id.substring(2, 4); oaF = id.substring(4, 6); version = v.id
	let s = $('submit'), t = $('title'), f = $('feedback'), g = $('glosa'), k = $('caption'), w = $('finish'), x = $('close'), y = $('message')
		x.onclick = (e) => { f.classList.add('hidden'); s.removeAttribute('disabled') }; w.onclick = (e) => { g.classList.add('hidden') }
		s.onclick = () => { answer() }; s.innerText = 'Enviar'; t.innerText = 'Gráfico de Datos'

	let print = () => { //Imprimir o dibujar ejercicio
		h.forEach(n => { 
			c[n].forEach((m, i) => {
				let j = FUNCIONES.findIndex(x => x.tag == m.tag), k = FUNCIONES[j].fns.findIndex(x => x.id == m.name)
				FUNCIONES[j].fns[k].action({ container:$(`container-${n}${i}`), params:m.params, versions:v.vars, vt:false })
				//if (n == 'r') { let e = $(`container-${n}${i}`); e.onclick = () => { select(e) } }
			})
		})
	}
    let answer = () => { //Validar respuesta y mostrar feedback
    	let u = $('answer'), e = u.elements, z = u.getAttribute('type'), ans = false

    	if (respGeneral < 2 && !check) {
	    	for (let i = 0, a = e[0]; i < e.length; i++, a = e[i]) {
	    		if ((z == 'radio' || z == 'checkbox') && a.checked) {
	    			errFre = a.getAttribute('error'); feed = a.getAttribute('feed'); ans = a.value; break
	    		}
	    		else if (z == 'select') {
	    			let o = a.item(a.selectedIndex)
	    			if (o.value != 'null') { 
	    				errFre = o.getAttribute('error'); feed = o.getAttribute('feed'); ans = o.value; break 
	    			}
	    		}
	    	}

	    	if (!ans) { console.log('sin respuesta'); feed = u.getAttribute('feed') }
	    	else console.log('answer: ' + ans + '\nerror: ' + errFre + '\nfeedback: ' + feed)
	    	y.innerHTML = `<h3>${feed}</h3>`

	    	if (errFre == 'null') {
	    		k.setAttribute('style', 'background-image:url(https://goo.gl/WeWvAP)')
	    		f.classList.remove('hidden'); s.setAttribute('disabled', 'true'); check = true
	    	} else {
	    		if (!respGeneral) { f.classList.remove('hidden'); s.setAttribute('disabled', 'true') } 
		        else { g.classList.remove('hidden'); s.setAttribute('disabled', 'true'); print() }
	    	}

	    	values = ans
    		respGeneral++
    		enviar()
    	}
    	else
    	{
    		console.log('salir')
    	}
    }
	let select = (e) => { //Seleccionar respuesta
		c.r.forEach((m, i) => { $(`container-r${i}`).setAttribute('style', 'border:1px solid #ddd') })
		e.setAttribute('style', 'border:5px solid #bc2424')
	}

	print()
}

function $(id) { return document.getElementById(id) }
function get(attr) { return JSON.parse(document.body.getAttribute(attr).replace(/\'/g, '\"')) }
function replace(input, vars) { vars.forEach(m => { input = input.toString().replace(`$${m.var}`, m.val) }); return input }
function shuffle(arr, t = 10) { for (let i = 0; i < t; i++) { arr = arr.sort(() => (.5 - Math.random())) }; return arr }

const FUNCIONES = [	
	{ name:'General', tag:'general', fns:[ { id:'Insertar Texto', action:insertarTexto }, { id:'Insertar Input', action:insertarInput } ] },
	{ name:'Datos', tag:'datos', fns:[ { id:'Gráfico Datos', action:graficoDatos } ] }
]
function insertarTexto(config) {
	const { container, params, variables, versions, vt } = config
	if (container) {
		let vars = vt ? variables : versions
  		container.innerHTML = replace(params.content, vars, vt)
	}
}
function insertarInput(config) {
	const { container, params, variables, versions, vt } = config, vars = vt ? variables : versions, 
		{ inputType, value1, value2, value3, value4, error2, error3, error4, feed0, feed1, feed2, feed3, feed4 } = params
	let ans = [value1, value2, value3, value4], err = [null, error2, error3, error4], fee = [feed1, feed2, feed3, feed4], 
		r = [], n = '', e = '', f = '', c = ''
	
	if (container) {
		switch(inputType) {
			case 'input': { c = '<input type="text" placeholder="Respuesta"></input>'; break }
			case 'radio': {
				ans.forEach((m, i) => { 
					n = eval(replace(m, vars, vt)); e = err[i]; f = fee[i] != '' ? fee[i] : feed0
					r.push(`<li key="${i}"><input name="ans" value="${n}" type="radio" error="${e}" feed="${f}"/><label>&nbsp;&nbsp;${n}</label></li>`)	
				}); c = shuffle(r).join('')
				break
			}
			case 'checkbox': {
				ans.forEach((m, i) => { 
					n = eval(replace(m, vars, vt)); e = err[i]; f = fee[i] != '' ? fee[i] : feed0
					r.push(`<li key="${i}"><input name="ans" value="${n}" type="checkbox" error="${e}" feed="${f}"/><label>&nbsp;&nbsp;${n}</label></li>`)
				}); c = shuffle(r).join('')
				break
			}
			case 'select': {
				ans.slice(0, 3).forEach((m, i) => { 
					n = eval(replace(m, vars, vt)); e = err[i]; f = fee[i] != '' ? fee[i] : feed0
					r.push(`<option key="${i}" value="${n}" error="${e}" feed="${f}">${n}</option>`)
				}); c = `<select><option selected disabled value="null">Seleccionar respuesta</option>${shuffle(r).join('')}</select>`
				break
			}
			case 'textarea': { c = '<textarea placeholder="Respuesta"></textarea>'; break }
		}
		container.innerHTML = `<form id="answer" feed="${feed0}" type="${inputType}">${c}</form>`
	}
}
function graficoDatos(config) 
{
    const { container, params, variables, versions, vt } = config
    const { axisColor, axisWidth, borderColor, borderRadius, borderWidth, background, fontColor, extra, lineColor, lineWidth, chartBorder,
        chartPosition, chartColor, chartValues, chartTags, titleValue, titleSize, titleColor, axisTitleX, axisTitleY, margin, titleTop, fontSize,
        scaleMax, scaleMin, scaleInterval, scaleColor, scaleWidth, dataTag, withAxis, limitVal, highlightBar } = params

    if (!container) return
    let maxWidth = container.parentElement.offsetWidth, responsive = params.width < maxWidth,
        width = responsive ? params.width : maxWidth - 15, height = responsive ? params.height : width

    container.width = width
    container.height = height

    let vars = vt ? variables : versions
    let values = replace(chartValues, vars, vt).split(',')
    let state = {
        axis: { color: axisColor, scale: 'auto', title_x: axisTitleX, title_y: axisTitleY, width: axisWidth },
        border: { color: borderColor, radius: borderRadius, width: borderWidth, margin:margin },
        canvas: { color: background, ctx: container.getContext('2d'), height: height, width: width },
        chart: { border: { color: chartBorder, width: 2 }, color: chartColor.split(','), length: values.length, 
                margin: { x:margin == 'si' ? 70 : 50, y:margin == 'si' ? 90 : 60 }, padding: { x:10, y:10 }, position: chartPosition, 
                values: values, tags: replace(chartTags, vars, vt).split(','), dataTag: dataTag, withAxis: withAxis == 'si' ? true : false },
        extra: { limit: extra == 'limite', projection: extra == 'proyeccion', highlightBar: highlightBar ? highlightBar.split(',') : '' },
        font: { align: 'center', color: fontColor, family: 'arial', size: fontSize },
        line: { color: lineColor, value: 10, width: lineWidth, limitVal:replace(limitVal, vars, vt).split(',') },
        scale: { max:Number(scaleMax), min:Number(scaleMin), interval:Number(scaleInterval), color:scaleColor, width:scaleWidth }, 
        title: { color: titleColor, size: titleSize, value: titleValue, top:titleTop }
    }

    const { chart } = state
    const { x, y } = chart.margin

    let data = {
        ctx: container.getContext('2d'), height: height - 2*y, len: chart.length, 
        max: Math.max(...chart.values), width: width - 2*(x + 10), x0: x, y0: height - y,
        dx: Math.min(Math.floor((width - 2*(x + 10))/(3/2*chart.length)), 100),
        dy: Math.min(Math.floor((height - 2*(y - 5))/(4/3*chart.length)), 60)
    }

    data.cx = data.x0 + 2*chart.padding.x + data.width/data.len/2 - data.dx/2
    data.cy = data.y0 - chart.padding.y - data.height/data.len/2 - data.dy/2    

    data.ctx.translate(0, margin == 'si' ? 0 : 10)
    data.ctx.save()

    generarColumnas(data, state)
    generarEjes(container, state)
    if (state.extra.projection) 
        proyectarColumnas(data, state)
    if (state.extra.limit) 
        limitarColumnas(data, state)
    insertarTextos(data, state)
    insertarValores(data, state)

	function generarEjes(canvas, state) {

	    let ctx = canvas.getContext('2d')

	    const { axis, chart, font, title } = state
	    const { height, width } = state.canvas
	    const { x, y } = chart.margin 
	    const { padding } = chart

	    ctx.beginPath()
	    ctx.moveTo(x, y - 2*padding.y)
	    ctx.lineTo(x, height - y) //EJE VERTICAL
	    ctx.lineTo(width - x + 2*padding.x, height - y) //EJE HORIZONTAL
	    
	    if (chart.withAxis) {
	        //EJE VERTICAL
	        ctx.moveTo(x + width/110, y - 2*padding.y + width/110)
	        ctx.lineTo(x, y - 2*padding.y)
	        ctx.lineTo(x - width/110, y - 2*padding.y + width/110)
	        //EJE HORIZONTAL
	        ctx.moveTo(width - x + 2*padding.x - width/110, height - y - width/110) 
	        ctx.lineTo(width - x + 2*padding.x, height - y)
	        ctx.lineTo(width - x + 2*padding.x - width/110, height - y + width/110)
	    }

	    ctx.lineWidth = axis.width
	    ctx.strokeStyle = axis.color
	    ctx.stroke()

	    ctx.textAlign = font.align
	    ctx.font = font.size + 'px ' + font.family
	    ctx.fillText(axis.title_x, width/2, height - x/2 + Number(font.size) - 12) //INSERTAR TITULO X

	    ctx.rotate(3*Math.PI/2)
	    ctx.fillText(axis.title_y, - height/2, y/2 - Number(font.size)/3) //INSERTAR TITULO Y

	    ctx.rotate(Math.PI/2)
	    ctx.fillStyle = title.color
	    ctx.font = title.size + 'px ' + font.family
	    ctx.fillText(title.value, width/2, title.top) //INSERTAR TITULO

	    ctx.closePath()
	}
	function generarColumnas(data, state) {

	    const { canvas, chart, scale, font, extra } = state
	    const { dx, dy, height, len, max, width, x0, y0 } = data
	    const { ctx } = canvas
	    const limit = Math.max(scale.max, max)

	    ctx.beginPath()
	    ctx.clearRect(0, 0, canvas.width, canvas.height)
	    ctx.strokeStyle = scale.color == '' ? 'transparent' : scale.color
	    ctx.lineWidth = scale.width

	    extra.highlightBar && resaltarBarras(data, state)

	    if (chart.position == 'vertical') 
	    {
	        if (scale.interval > 0) {
	            ctx.textAlign = 'right'
	            ctx.font = 14 + 'px ' + font.family

	            if (scale.width > 0)
	            for (let i = scale.min; i <= limit; i += scale.interval) { 
	                let dy = height/limit * i, y = y0 - dy //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.moveTo(chart.margin.x, y)
	                ctx.lineTo(canvas.width - chart.margin.x + 2*chart.padding.x, y)
	            }
	            ctx.stroke()
	            ctx.closePath()

	            ctx.beginPath()
	            ctx.fillStyle = font.color
	            for (let i = scale.min; i <= limit; i += scale.interval) {
	                let dy = height/limit * i, y = y0 - dy //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.fillText(i, x0 - 7, y + 5) //INSERTAR TEXTO
	            }
	            ctx.closePath()
	        }

	        ctx.beginPath()
	        ctx.fillStyle = chart.color[0]
	        for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
	            let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÃƒâ€˜O DE LA COLUMNA
	            ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA      
	            ctx.moveTo(x, y0) 
	            ctx.lineTo(x, y)
	            ctx.lineTo(x + dx, y)
	            ctx.lineTo(x + dx, y0) //BORDES COLUMNA
	        }
	    } 
	    else 
	    {
	        if (scale.interval > 0) {
	            ctx.textAlign = 'right'
	            ctx.font = 14 + 'px ' + font.family

	            if (scale.width > 0)
	            for (let i = scale.min; i <= limit; i += scale.interval) { 
	                let dx = width/limit * i, x = x0 + dx //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.moveTo(x, chart.margin.y - 2*chart.padding.y)
	                ctx.lineTo(x, y0)
	            }
	            ctx.stroke()
	            ctx.closePath()

	            ctx.beginPath()
	            ctx.fillStyle = font.color
	            ctx.textAlign = font.align
	            for (let i = scale.min; i <= limit; i += scale.interval) {
	                let dx = width/limit * i, x = x0 + dx //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.fillText(i, x, y0 + 24) //INSERTAR TEXTO
	            }
	            ctx.closePath()
	        }

	        ctx.fillStyle = chart.color[0]
	        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
	            let dx = width/limit * chart.values[i], x = x0 //TAMAÃƒâ€˜O DE LA COLUMNA
	            ctx.fillRect(x, y, dx, dy) //DIBUJAR COLUMNA
	            ctx.moveTo(x, y) 
	            ctx.lineTo(x + dx, y)
	            ctx.lineTo(x + dx, y + dy)
	            ctx.lineTo(x, y + dy) //BORDES COLUMNA
	        }
	    }

	    ctx.strokeStyle = chart.border.color
	    ctx.lineWidth = chart.border.width
	    ctx.stroke()
	    ctx.closePath()
	}
	function proyectarColumnas(data, state) {

	    const { chart, line, scale } = state
	    const { ctx, height, len, max, width, x0, y0 } = data
	    const limit = Math.max(scale.max, max)
	   
	    ctx.beginPath()
	    if (chart.position == 'vertical') 
	    {
	        for (let i = 0, x = data.cx; i < len; i++, x += width/len) {
	            let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÃƒâ€˜O DE LA COLUMNA
	            ctx.moveTo(x0, y) 
	            ctx.lineTo(x, y) //PROYECCION COLUMNA
	        }
	    }
	    else
	    {
	        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
	            let dx = width/limit * chart.values[i], x = x0 //TAMAÃƒâ€˜O DE LA COLUMNA
	            ctx.moveTo(x + dx, y0) 
	            ctx.lineTo(x + dx, y) //PROYECCION COLUMNA
	        }
	    }

	    ctx.strokeStyle = line.color
	    ctx.setLineDash([5, 1])
	    ctx.lineWidth = line.width
	    ctx.stroke()
	    ctx.closePath()
	}
	function limitarColumnas(data, state) {
	    const { chart, line, scale, canvas } = state
	    const { ctx, height, len, max, width, x0, y0 } = data
	    const limit = Math.max(scale.max, max)

	    let values = line.limitVal
	    if (values.length) 
	    {
	        ctx.beginPath()
	        if (chart.position == 'vertical') 
	        {
	            for (let i = 0, x = data.cx; i < max; i++, x += width/len) {
	                let dy = height/limit * values[i], y = y0 - dy //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.moveTo(x0, y) 
	                ctx.lineTo(canvas.width - chart.margin.x + 2*chart.padding.x, y) //PROYECCION COLUMNA
	            }
	        }
	        else
	        {
	            for (let i = 0, y = data.cy; i < max; i++, y -= height/len) {
	                let dx = width/limit * values[i], x = x0 //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.moveTo(x + dx, y0) 
	                ctx.lineTo(x + dx,  chart.margin.y - 2*chart.padding.y + canvas.height/110) //PROYECCION COLUMNA
	            }
	        }
	        ctx.strokeStyle = line.color
	        ctx.setLineDash([5, 1])
	        ctx.lineWidth = line.width
	        ctx.stroke()
	        ctx.closePath()
	    }
	}
	function insertarTextos(data, state) {

	    const { chart, font } = state
	    const { ctx, dx, dy, height, len, width, x0, y0 } = data
	    
	    ctx.beginPath()
	    ctx.font = 14 + 'px ' + font.family
	    ctx.fillStyle = font.color

	    if (chart.position == 'vertical') 
	    {
	        ctx.textAlign = font.align    
	        for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
	            ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x, y0 + 19) //INSERTAR TEXTO
	        }
	    }
	    else 
	    {
	        ctx.textAlign = 'right'
	        for (let i = 0, y = data.cy; i < len; i++, y-= height/len) {
	            ctx.fillText(chart.tags.length > i ? chart.tags[i] : '', x0 - 5, y + dy/2 + 5) //INSERTAR TEXTO 
	        }
	    }

	    ctx.closePath()
	}
	function insertarValores(data, state) {
	    const { chart, font, scale } = state
	    const { ctx, dx, dy, height, len, max, width, x0, y0 } = data
	    
	    if (chart.dataTag != '' && chart.dataTag) {
	        ctx.save()
	        ctx.fillStyle = font.color
	        
	        let dataTags = chart.dataTag.split(',')
	    
	        ctx.beginPath()
	        let fontSize = 14
	        ctx.font = fontSize + 'px ' + font.family
	        const limit = Math.max(scale.max, max)
	        ctx.textAlign = font.align

	        if (chart.position == 'vertical') {
	            for (let i = 0, x = data.cx + dx/2; i < len; i++, x += width/len) {
	                if (dataTags[i] == '0') {
	                    let dy = height/limit * chart.values[i], y = y0 - dy//TAMAÃƒâ€˜O DE LA COLUMNA
	                    ctx.fillText(chart.values[i], x, y - 10) //INSERTAR TEXTO
	                }
	            }
	        } else {
	            for (let i = 0, y = data.cy + dy/2 + fontSize/2; i < len; i++, y -= height/len) {
	                if (dataTags[i] == '0') {
	                    let dx = width/limit * chart.values[i], x = x0 + dx//TAMAÃƒâ€˜O DE LA COLUMNA
	                    ctx.fillText(chart.values[i], x + 15, y) //INSERTAR TEXTO
	                }
	            }
	        }
	        
	    } else {
	        ctx.fillStyle = 'transparent'
	    }
	    
	    ctx.closePath()
	    ctx.restore()
	    ctx.save()
	}
	function resaltarBarras(data, state) {

	    const { canvas, chart, scale, extra } = state
	    const { dx, dy, height, len, max, width, x0, y0 } = data
	    const { ctx } = canvas
	    const limit = Math.max(scale.max, max)

	    let hightBar = extra.highlightBar

	    if (chart.position == 'vertical') {
	        ctx.beginPath()
	        ctx.fillStyle = 'rgba(212,230,192, 0.6)'
	        for (let i = 0, x = data.cx/1.1; i < len; i++, x += width/len) {
	            if (!isNaN(hightBar[i]) && hightBar[i].length === 1 && eval(hightBar[i]) === 0) {
	                let dy = height/limit * chart.values[i], y = y0 - dy //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.fillRect(x, y - height/limit, dx*1.2, dy + height/limit*1.4) //DIBUJAR COLUMNA
	            }
	        }
	    } else {
	        ctx.beginPath()
	        ctx.fillStyle = 'rgba(212,230,192, 0.6)'
	        for (let i = 0, y = data.cy; i < len; i++, y -= height/len) {
	            if (!isNaN(hightBar[i]) && hightBar[i].length === 1 && eval(hightBar[i]) === 0) {
	                let dx = width/limit * chart.values[i], x = x0 //TAMAÃƒâ€˜O DE LA COLUMNA
	                ctx.fillRect(x - x*0.4, y - height/len*0.1, dx + x*0.8, dy + height/len*0.2) //DIBUJAR COLUMNA
	            }
	        }
	    }
	}
}