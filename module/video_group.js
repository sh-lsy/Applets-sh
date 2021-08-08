// 视频链接

module.exports = (query, request) => {
  const data = {
    groupId: query.id,
    offset: query.offset || 0,
    needUrl: true,
    resolution: query.res || 1080
  }
  console.log('test11', {
    crypto: 'weapi',
    cookie: query.cookie,
    proxy: query.proxy
  })
  let obj = {
    MUSIC_U: 'f961d558ddf6047db7bd5be6600a5cb30dbfb9a24bc49efa1e0967eb843f9777f8eba1d7ed3f0aca',
    'Max-Age': '1296000',
    Expires: 'Sat 31 Jul 2021 08:47:11 GMT',
    Path: '/'
  }
  return request(
    'POST', `https://music.163.com/weapi/videotimeline/videogroup/get`, data, {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy
    }
  )
}
// {
//   MUSIC_U: 'f961d558ddf6047db7bd5be6600a5cb30dbfb9a24bc49efa1e0967eb843f9777f8eba1d7ed3f0aca',
//   'Max-Age': '1296000',
//   Expires: 'Sat 31 Jul 2021 08:47:11 GMT',
//   Path: '/'
// }