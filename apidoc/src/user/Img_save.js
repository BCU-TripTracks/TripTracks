/**
 * @api {get} /Users/Top_Tags 7. 이미지 파일 저장
 * @apiName Img_save
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자가 게시물을 올릴시 이미지를 저장하는 API 입니다.
 *
 * @apiHeader {List} images 이미지리스트 파일
 * @apiHeader {Text} imgPath 이미지리스트 파일 주소
 * @apiHeader {Text} imgFolder 이미지리스트 폴더 서버 주소
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 CREATED
 *     {
 *      "Result": "Success",
 *      "imgPath": imgSrcs
 *     }
 *
 * @apiError dbErr Internal Sercer Error
 *
 * @apiErrorExample {json} NotExistEmail-Response:
 *     HTTP/1.1 400 Conflict
 *     {
 *       "Result": "태그연결 실패",
 *       "Top_TagError": "Error",
 *     }
 */
