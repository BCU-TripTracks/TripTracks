/**
 * @api {post} /Users/LifeThemeSetup 3-2.회원가입-테마지정
 * @apiName LifeThemeSetup
 * @apiGroup Users
 *
 * @apiHeader {String} User_Email 사용자 이메일
 * @apiHeader {List} Seanson 계절 
 * @apiHeader {List} Food 음식
 * @apiHeader {List} Trip 여행
 * @apiHeader {List} State 지역
 * @apiHeader {List} Leisure 레저
 * 
 * @apiHeaderExample {json} 요청예시:
 *  {
 *    "User_Email": "leeyoungjae2001@icloud.com",
 *    "Seanson": {
 *      "Spring": True,
 *      "Summer": False,
 *      "Autumn": False,
 *      "Winter": False,
 *    },
 *    "Food": {
 *      "Korean": True,
 *      "Chinese": False,
 *      "Japanese": False,
 *      "Western": False,
 *    },
 *    "Trip": {
 *      "Hotel": True,
 *      "Backpacking": False,
 *      "Camping": False,
 *    },
 *    "State": {
 *      "경기": True,
 *      "강원": False,
 *      "경북": False,
 *      "경남": True,
 *      "충천": False,
 *      "전북": False,
 *      "전남": False,
 *      "제주": False,
 *    },
 *    "Leisure": {
 *      "Snow_Board": True,
 *      "Ski": False,
 *      "Water_Ski": False,
 *      "Wake_Board": True,
 *      "Tracking": False,
 *      "Fishing": False,
 *      "Golf": False,
 *      "Water_Park": False,
 *    },
 *  }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 CREATED
 *     {
*           "signup_result": "success",
 *     }
 *
 * @apiError NotExistEmail 존재하지 않는 메일
 *
 * @apiErrorExample {json} NotExistEmail-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "존재하지 않는 메일"
 *     }
 */