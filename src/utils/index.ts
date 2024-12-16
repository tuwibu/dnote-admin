import { FilterState, OptionState } from '@typings/datatable'

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace)
}

export const formatSize = (fileSize: number) => {
  if (fileSize === 0) {
    return 'Unknown'
  } else {
    const i = Math.floor(Math.log(fileSize) / Math.log(1024))
    const size = ((fileSize / Math.pow(1024, i)) * 1).toFixed(2)
    return `${size} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
  }
}

export const getPathName = (pathName: string): string[] => {
  const split = pathName.split('/')
  split.shift()
  split.shift()
  return split
}

export const convertFilter = (array: OptionState): FilterState => {
  return array.map((item) => {
    return {
      text: item.label,
      value: item.value
    }
  })
}

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const numberFormat = (num?: string | number, prefix?: string): string => {
  try {
    if (num) {
      num = (num + '').replace(/[^0-9+\-Ee.]/g, '')
      let n = !isFinite(+num) ? 0 : +num
      let prec = 6
      let sep = ','
      let dec = '.'
      let s: any = ''
      let toFixedFix = (ns: any, precs: any) => {
        if (('' + ns).indexOf('e') === -1) {
          let vls: any = ns + 'e+' + precs
          return +(Math.round(vls) + 'e-' + prec)
        } else {
          let arr = ('' + n).split('e')
          let sig = ''
          if (+arr[1] + precs > 0) {
            sig = '+'
          }
          let vlss: any = +arr[0] + 'e' + sig + (+arr[1] + precs)
          let vlsss = +Math.round(vlss) + 'e-' + precs
          return Number(vlsss).toFixed(precs)
        }
      }
      s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
      if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
      }
      let result = s.join(dec)
      if (prefix) result = prefix + result
      return result
    } else {
      return '0'
    }
  } catch (ex) {
    return '0'
  }
}

export const removeHtml = (str: string) => {
  return str.replace(/<(?:.|\n)*?>/gm, '')
}

export const cutString = (str: string, length: number) => {
  str = str.replace(/\"/gm, "'").trim()
  str = removeHtml(str)
  if (str.length < length) return str
  else {
    str = str.substring(0, length) + ' ...'
    return str
  }
}

export const secondsToDuration = (seconds: number) => {
  // 33130 => 9h13m50s
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const minutes = Math.floor(seconds / 60)
  seconds %= 60
  if (hours > 0) {
    return `${hours}h${minutes}m${seconds}s`
  }
  if (minutes > 0) {
    return `${minutes}m${seconds}s`
  }
  return `${seconds}s`
}

export const secondsToHMS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  seconds %= 3600
  const minutes = Math.floor(seconds / 60)
  seconds %= 60
  if (hours > 0) {
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }
  if (minutes > 0) {
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }
  return `00:${seconds < 10 ? '0' + seconds : seconds}`
}

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const parseVideoId = (url: string) => {
  if (url.includes('youtube.com')) {
    url = url.trim()
    url = url.replace('https://www.youtube.com/', '')
    url = url.replace('https://youtu.be/', '')
    url = url.replace('https://m.youtube.com/', '')
    url = url.replace('https://music.youtube.com/', '')
    url = url.replace('playlist?list=', '')
    url = url.replace('watch?v=', '')
    if (url.includes('&')) {
      url = url.split('&')[0]
    }
    url = url.replace('/', '')
  } else if (url.includes('drive.google.com')) {
    url = url.trim()
    url = url.replace('https://drive.google.com/file/d/', '')
    url = url.replace('https://drive.google.com/open?id=', '')
    url = url.split('/')[0]
  } else if (url.includes('twitch.tv')) {
    url = url.trim()
    url = url.replace('https://www.twitch.tv/', '')
    url = url.replace('https://m.twitch.tv/', '')
    url = url.replace('https://twitch.tv/', '')
    url = url.replace('videos/', '')
  }
  return url
}
