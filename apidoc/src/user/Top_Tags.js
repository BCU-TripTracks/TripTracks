/**
 * @api {get} /Users/Top_Tags 6. 상위 태그 노출
 * @apiName Top_Tags
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자의 태그를 설정할 시 상위 10개의 태그를 노출하는 API 입니다.
 *
 * @apiHeader {String} formattedTags 태그
 * @apiHeader {List} topTags 상위 10개의 태그 리스트
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 CREATED
 *     {
 *      "Result": "Success",
 *      "TopTags": formattedTags
 *     }
 *
 * @apiError Top_TagError 태그연결 실패
 *
 * @apiErrorExample {json} NotExistEmail-Response:
 *     HTTP/1.1 400 Conflict
 *     {
 *       "Result": "태그연결 실패",
 *       "Top_TagError": "Error",
 *     }
 */
