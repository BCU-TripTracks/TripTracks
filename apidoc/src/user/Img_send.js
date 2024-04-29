/**
 * @api {get} /Users/Top_Tags 8. 이미지 파일 출력
 * @apiName Img_send
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자가 게시물을 확인시 이미지를 저장하는 API 입니다.
 *
 * @apiHeader {List} Img_src 이미지리스트 주소
 * @apiHeader {Text} post_id 게시물 아이디
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 CREATED
 *     {
 *      "Result": "Success",
 *      "imgPath": imgSrcs
 *     }
 *
 * @apiError err Internal Sercer Error
 *
 * @apiErrorExample {json} err:
 *     HTTP/1.1 500 Conflict
 *     {
 *       "Result": "err",
 *       "err": "Internal Server Error",
 *     }
 */
