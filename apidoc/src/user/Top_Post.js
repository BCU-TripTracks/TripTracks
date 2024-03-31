/**
 * @api {get} /Users/Top_Post 5. 상위 게시물 노출
 * @apiName Top_Post
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자 로그인 시 출력되는 노출 상위 20개의 게시물을 출력하는 API 입니다.
 *
 * @apiHeader {String} Post_Caption 게시물의 내용
 * @apiHeader {String} Image_Src 게시물의 이미지 주소
 * @apiHeader {List} topPosts 상위 20개의 게시물 리스트
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 CREATED
 *     {
 *      "Result": "Success",
 *      "TopTags": "topPost"
 *     }
 *
 * @apiError Top_PostError 게시물연결 실패
 *
 * @apiErrorExample {json} NotExistEmail-Response:
 *     HTTP/1.1 400 Conflict
 *     {
 *       "Result": "태그연결 실패",
 *       "Top_PostError": "Error",
 *     }
 */
