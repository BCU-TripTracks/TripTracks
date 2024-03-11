/**
 * @api {post} /Users/TagSetup 3-2. 사용자 태그 지정
 * @apiName TagSetup
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription 사용자의 태그를 설정하는 API 입니다.
 *
 * @apiHeader {String} User_Email 사용자 이메일
 * @apiHeader {List} Tags 사용자가 선택한 태그 리스트
 *
 * @apiHeaderExample {json} 요청예시:
 *  {
 *    "User_Email": "leeyoungjae2001@icloud.com",
 *    "Tags": ['운동','캠핑','액티비티','불멍','캠프파이어'],
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
 *      "Result": "Success",
 *      "Message": "태그 설정 완료",
 *     }
 *
 * @apiError NotExistEmail 존재하지 않는 사용자
 *
 * @apiErrorExample {json} NotExistEmail-Response:
 *     HTTP/1.1 400 Conflict
 *     {
 *       "Result": "Fail",
 *       "Error": "NotExistEmail",
 *       "Message": "존재하지 않는 사용자"
 *     }
 */
