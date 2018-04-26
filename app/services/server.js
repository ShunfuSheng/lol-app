// 请求函数统一接口
export async function request(url, options) {
  const optionsTemp = { ...options, credentials: 'include' }
  const response = await fetch(url, optionsTemp)
  checkStatus(response);
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.indexOf('application/json') === 0) {
    const data = await response.json()
    return data
  } 
    return null
  
}

// get请求
export async function httpGet(url) {
  return request(url, {
    method: 'GET',
  })
}

// post请求
export async function httpPost(url, values) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(values),
  })
}

// 过滤response响应
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  let responseStatusText = response.responseText
  if (response.status === 401) {
    responseStatusText = '抱歉您尚无此权限';
  } else if (response.status >= 500) {
    responseStatusText = '服务端出错，请联系管理人员';
  } else if (response.status === 404) {
    responseStatusText = '404错误，没有该api接口';
  }
  const error = new Error(responseStatusText);
  error.response = response;
  throw error;
}
