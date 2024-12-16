function Client(websocketURL, canvasID, id, width, height) {
  this.websocketURL = websocketURL
  this.canvas = document.getElementById(canvasID)
  this.id = id
  this.width = width
  this.height = height
  this.ctx = this.canvas.getContext('2d')
  this.pointerCacheCanvas = document.getElementById('pointer-cache')
  this.pointerCacheCanvasCtx = this.pointerCacheCanvas.getContext('2d')
  this.connected = false
  this.pointerCache = {}

  this.handleKeyDown = this.handleKeyDown.bind(this)
  this.handleKeyUp = this.handleKeyUp.bind(this)
  this.handleMouseMove = this.handleMouseMove.bind(this)
  this.handleMouseDown = this.handleMouseDown.bind(this)
  this.handleMouseUp = this.handleMouseUp.bind(this)
  this.handleWheel = this.handleWheel.bind(this)
  this.initialize = this.initialize.bind(this)
  this.handleMessage = this.handleMessage.bind(this)
  this.deinitialize = this.deinitialize.bind(this)
}

Client.prototype.connect = function () {
  if (this.id.length === 0) {
    alert('id is required')

    return
  }

  const url = new URL(this.websocketURL)
  url.searchParams.set('id', this.id)
  url.searchParams.set('width', this.width)
  url.searchParams.set('height', this.height)

  this.socket = new WebSocket(url.toString())

  this.socket.onopen = this.initialize

  this.handleMessage = this.handleMessage.bind(this)
  this.socket.onmessage = (e) => {
    e.data.arrayBuffer().then((arrayBuffer) => this.handleMessage(arrayBuffer))
  }

  this.socket.onerror = function (e) {
    console.log('error:', e)
  }

  this.socket.onclose = this.deinitialize
}

Client.prototype.initialize = function () {
  if (this.connected) {
    return
  }

  // const data = new ArrayBuffer(4);
  // const w = new BinaryWriter(data);
  //
  // w.uint16(this.canvas.width, true);
  // w.uint16(this.canvas.height, true);
  //
  // this.socket.send(data);

  window.addEventListener('keydown', this.handleKeyDown)
  window.addEventListener('keyup', this.handleKeyUp)
  this.canvas.addEventListener('mousemove', this.handleMouseMove)
  this.canvas.addEventListener('mousedown', this.handleMouseDown)
  this.canvas.addEventListener('mouseup', this.handleMouseUp)
  this.canvas.addEventListener('contextmenu', this.handleMouseUp)
  this.canvas.addEventListener('wheel', this.handleWheel)

  this.connected = true

  // const size = 64;
  // const rowDelta = size * 2;
  // const resultSize = size * size * 4;
  //
  // this.inputPtr = Module._malloc(rowDelta * size);
  // this.outputPtr = Module._malloc(resultSize);
  // this.flipVTempPtr = Module._malloc(rowDelta);
  // this.pbResultBufferPtr = Module._malloc(resultSize);
}

Client.prototype.deinitialize = function () {
  window.removeEventListener('keydown', this.handleKeyDown)
  window.removeEventListener('keyup', this.handleKeyUp)
  this.canvas.removeEventListener('mousemove', this.handleMouseMove)
  this.canvas.removeEventListener('mousedown', this.handleMouseDown)
  this.canvas.removeEventListener('mouseup', this.handleMouseUp)
  this.canvas.removeEventListener('contextmenu', this.handleMouseUp)
  this.canvas.removeEventListener('wheel', this.handleWheel)

  this.connected = false

  // Module._free(this.inputPtr);
  // Module._free(this.outputPtr);
  // Module._free(this.flipVTempPtr);
  // Module._free(this.pbResultBufferPtr);

  Object.entries(this.pointerCache).forEach(([index, style]) => {
    document.getElementsByTagName('head')[0].removeChild(style)
  })
  this.pointerCache = {}
  this.canvas.classList = []

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Client.prototype.handleMessage = function (arrayBuffer) {
  if (!this.connected) {
    return
  }

  const r = new BinaryReader(arrayBuffer)
  const header = parseUpdateHeader(r)

  if (header.isCompressed()) {
    console.warn('compressing is not supported')

    return
  }

  if (header.isBitmap()) {
    this.handleBitmap(r)

    return
  }

  if (header.isPointer()) {
    this.handlePointer(header, r)

    return
  }

  if (header.isSynchronize()) {
    // an artifact of the T.128 protocol ([T128] section 8.6.2) and SHOULD be ignored.
    return
  }

  console.warn('unknown update:', header.updateCode)
}

function buf2hex(buffer) {
  // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0')).join('')
}

Client.prototype.handleBitmap = function (r) {
  const bitmap = parseBitmapUpdate(r)

  // const size = 64;
  // const resultSize = size * size * 4;

  // const inputPtr = this.inputPtr;
  // const outputPtr = this.outputPtr;
  // const flipVTempPtr = this.flipVTempPtr;
  // const pbResultBufferPtr = this.pbResultBufferPtr;

  bitmap.rectangles.forEach((bitmapData) => {
    const size = bitmapData.width * bitmapData.height
    const rowDelta = bitmapData.width * 2
    const resultSize = size * 2

    if (!bitmapData.isCompressed()) {
      let rgb = new Uint8ClampedArray(bitmapData.bitmapDataStream)
      let rgba = new Uint8ClampedArray(bitmapData.width * bitmapData.height * 4)

      flipV(rgb, bitmapData.width, bitmapData.height)
      rgb2rgba(rgb, resultSize, rgba)

      this.ctx.putImageData(
        new ImageData(rgba, bitmapData.width, bitmapData.height),
        bitmapData.destLeft,
        bitmapData.destTop
      )

      return
    }

    const inputPtr = Module._malloc(bitmapData.bitmapLength)
    const outputPtr = Module._malloc(resultSize)
    const inputHeap = new Uint8Array(
      Module.HEAPU8.buffer,
      inputPtr,
      bitmapData.bitmapDataStream.length
    )
    inputHeap.set(new Uint8Array(bitmapData.bitmapDataStream))

    const result = Module.ccall(
      'RleDecompress',
      'number',
      ['number', 'number', 'number', 'number'],
      [inputPtr, bitmapData.bitmapLength, outputPtr, rowDelta]
    )

    if (!result) {
      console.log('bad decompress:', bitmapData)
      return
    }

    let rgb = new Uint8ClampedArray(Module.HEAP8.buffer.slice(outputPtr, outputPtr + resultSize))
    let rgba = new Uint8ClampedArray(bitmapData.width * bitmapData.height * 4)

    flipV(rgb, bitmapData.width, bitmapData.height)
    rgb2rgba(rgb, resultSize, rgba)

    this.ctx.putImageData(
      new ImageData(rgba, bitmapData.width, bitmapData.height),
      bitmapData.destLeft,
      bitmapData.destTop
    )

    Module._free(inputPtr)
    Module._free(outputPtr)
  })
}

Client.prototype.handlePointer = function (header, r) {
  if (header.isPTRNull()) {
    this.canvas.classList = ['pointer-cache-null']

    return
  }

  if (header.isPTRDefault()) {
    this.canvas.classList = ['pointer-cache-default']

    return
  }

  if (header.isPTRColor()) {
    console.warn('ptr color is unsupported')

    return
  }

  if (header.isPTRNew()) {
    const newPointerUpdate = parseNewPointerUpdate(r)
    this.pointerCacheCanvasCtx.putImageData(
      newPointerUpdate.getImageData(this.pointerCacheCanvasCtx),
      0,
      0
    )

    const url = this.pointerCacheCanvas.toDataURL('image/webp', 1)

    if (this.pointerCache.hasOwnProperty(newPointerUpdate.cacheIndex)) {
      document
        .getElementsByTagName('head')[0]
        .removeChild(this.pointerCache[newPointerUpdate.cacheIndex])

      delete this.pointerCache[newPointerUpdate.cacheIndex]
    }

    const style = document.createElement('style')
    const className = 'pointer-cache-' + newPointerUpdate.cacheIndex
    style.innerHTML =
      '.' +
      className +
      ' {cursor:url("' +
      url +
      '") ' +
      newPointerUpdate.x +
      ' ' +
      newPointerUpdate.y +
      ', auto}'

    document.getElementsByTagName('head')[0].appendChild(style)

    this.pointerCache[newPointerUpdate.cacheIndex] = style

    this.canvas.classList = [className]

    return
  }

  if (header.isPTRCached()) {
    const cacheIndex = r.uint16(true)
    const className = 'pointer-cache-' + cacheIndex

    this.canvas.classList = [className]

    return
  }

  if (header.isPTRPosition()) {
    console.warn('ptr position is unsupported')

    return
  }

  console.log('unknown cursor:', header.updateCode)
}

Client.prototype.handleKeyDown = function (e) {
  if (!this.connected) {
    return
  }

  const event = new KeyboardEventKeyDown(e.code)

  if (event.keyCode === undefined) {
    console.warn('undefined key down:', e)
    e.preventDefault()
    return false
  }

  const data = event.serialize()

  this.socket.send(data)

  e.preventDefault()
  return false
}

Client.prototype.handleKeyUp = function (e) {
  if (!this.connected) {
    return
  }

  const event = new KeyboardEventKeyUp(e.code)

  if (event.keyCode === undefined) {
    console.warn('undefined key up:', e)
    e.preventDefault()
    return false
  }

  const data = event.serialize()

  this.socket.send(data)

  e.preventDefault()
  return false
}

function elementOffset(el) {
  let x = 0
  let y = 0

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft
    y += el.offsetTop - el.scrollTop
    el = el.offsetParent
  }

  return { top: y, left: x }
}

function mouseButtonMap(button) {
  switch (button) {
    case 0:
      return 1
    case 2:
      return 2
    default:
      return 0
  }
}

Client.prototype.handleMouseMove = function (e) {
  const offset = elementOffset(this.canvas)
  const event = new MouseMoveEvent(e.clientX - offset.left, e.clientY - offset.top)
  const data = event.serialize()

  this.socket.send(data)

  e.preventDefault()
  return false
}

Client.prototype.handleMouseDown = function (e) {
  const offset = elementOffset(this.canvas)
  const event = new MouseDownEvent(
    e.clientX - offset.left,
    e.clientY - offset.top,
    mouseButtonMap(e.button)
  )
  const data = event.serialize()

  this.socket.send(data)

  e.preventDefault()
  return false
}

Client.prototype.handleMouseUp = function (e) {
  const offset = elementOffset(this.canvas)
  const event = new MouseUpEvent(
    e.clientX - offset.left,
    e.clientY - offset.top,
    mouseButtonMap(e.button)
  )
  const data = event.serialize()

  this.socket.send(data)

  e.preventDefault()
  return false
}

Client.prototype.handleWheel = function (e) {
  const offset = elementOffset(this.canvas)

  const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY)
  const delta = isHorizontal ? e.deltaX : e.deltaY
  const step = Math.round((Math.abs(delta) * 15) / 8)

  const event = new MouseWheelEvent(
    e.clientX - offset.left,
    e.clientY - offset.top,
    step,
    delta > 0,
    isHorizontal
  )
  const data = event.serialize()

  this.socket.send(data)

  e.preventDefault()
  return false
}

Client.prototype.disconnect = function () {
  if (!this.socket) {
    return
  }

  this.deinitialize()

  this.socket.close(1000) // ok
}
