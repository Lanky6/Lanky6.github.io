/*币请求信息
 *author：xpf
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');
import tcserver from "./requesturl.json";
export default function request(action, body) {

	return fetch(tcserver.tcserver + action, {
		credentials: 'include',
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		body: body,
	})
}