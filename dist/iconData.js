'use strict';

var iconData = {
	'arrow': 'M15,18.4142136 C15,18.4142136 19.9706882,13.4435253 20.7071068,12.7071068 L19.2928932,11.2928932 C18.5564747,12.0293118 14.9999998,15.5900002 14.9999998,15.5900002 L10.7071068,11.2928932 L9.29289322,12.7071068 L15,18.4142136 Z',
	'arrow-small': 'M15.3535534,17.0606602L18.7071068 13.7071068 18 13 15.3535534 15.6435534 12.7071068 13 12 13.7071068 Z',
	'attach': 'M14.5,20 C13.5,20 13,19.5 13,18 L13,11 L14,11 L14,18 C14,18.5 14,19 14.5,19 C15,19 15,18.5 15,18 L15,9 C15,9 15,8 13.5,8 C12,8 12,9 12,9 L12,20 C12,21 12.6208724,22 14.5,22 C16,22 17,21 17,20 L17,11 L18,11 L18,20 C18,21.5 17,23 14.5,23 C12,23 11,21.5 11,20 L11,9 C11,8 12,7 13.5,7 C15,7 16,8 16,9 L16,18 C16,19.5 15.5,20 14.5,20 Z',
	'bank': 'M10,13 L11,13 L11,18 L10,18 L10,13 Z M13,13 L14,13 L14,18 L13,18 L13,13 Z M16,13 L17,13 L17,18 L16,18 L16,13 Z M19,13 L20,13 L20,18 L19,18 L19,13 Z M9,19 L21,19 L21,21 L9,21 L9,19 Z M9,11 L15,8 L21,11 L21,12 L9,12 L9,11 Z',
	'bold': 'M18,12 C18,10.5 17.5,9 14,9 L11,9 L11,20 L15,20 C17.5,20 19,19 19,16.5 C19,15 18,14 17,13.5 C18,13 18,12 18,12 Z M15,11 C15.5533333,11 16,11.4466667 16,12 C16,12.5533333 15.5533333,13 15,13 L13,13 L13,11 L15,11 Z M13,18 L13,15 L15,15 C16.5,15 17,15.67 17,16.5 C17,17.33 16.5,18 15,18 L13,18 Z',
	'bookmark': 'M11,9 L19,9 C19.5,9 20,9.5 20,10 L20,21 L15,18 L10,21 L10,10 C10,9.5 10.5,9 11,9 Z',
	'bullet-list': 'M8,12 C8,11.1715729 8.66579723,10.5 9.5,10.5 C10.3284271,10.5 11,11.1657972 11,12 C11,12.8284271 10.3342028,13.5 9.5,13.5 C8.67157288,13.5 8,12.8342028 8,12 Z M8,18 C8,17.1715729 8.66579723,16.5 9.5,16.5 C10.3284271,16.5 11,17.1657972 11,18 C11,18.8284271 10.3342028,19.5 9.5,19.5 C8.67157288,19.5 8,18.8342028 8,18 Z M13,11 L21,11 L21,13 L13,13 L13,11 Z M13,17 L21,17 L21,19 L13,19 L13,17 Z',
	'checkbox-check': 'M8.90380592 15.76776695l4.2426407 4.2426407 8.48528136-8.48528138-1.41421356-1.41421357-7.0710678 7.07106782-2.82842714-2.82842713 Z',
	'checkbox-indeterminate': 'M11 14h8v2h-8z',
	'checkbox-main': 'M6 9 L 6 21 Q 6 24 9 24 L 21 24 Q 24 24 24 21 L 24 9 Q 24 6 21 6 L 9 6 Q 6 6 6 9 Z',
	'caret': 'M10,13L15 18 20 13z',
	'clear': 'M14.5355339,13.8284271 L11.7071068,11 L11,11.7071068 L13.8284271,14.5355339 L11,17.363961 L11.7071068,18.0710678 L14.5355339,15.2426407 L17.363961,18.0710678 L18.0710678,17.363961 L15.2426407,14.5355339 L18.0710678,11.7071068 L17.363961,11 L14.5355339,13.8284271 Z M14.5,22 C18.6421356,22 22,18.6421356 22,14.5 C22,10.3578644 18.6421356,7 14.5,7 C10.3578644,7 7,10.3578644 7,14.5 C7,18.6421356 10.3578644,22 14.5,22 Z',
	'column': 'M15,8.00000001 L15,21 L20,21 C20.5,21 21,20.4545455 21,19.9090909 L21,9.09090913 C21,8.5 20.5,8.00000001 20,8.00000001 L15,8.00000001 Z M16,20 L16,9 L20,9 L20,20 L16,20 Z M9,8.00000001 C8.5,8 8,8.54545455 8.01,9.09090909 L8,19.9090909 C8,20.4545455 8.5,21 9,21 L14,21 L14,8.00000001 L9,8.00000001 Z',
	'copy': 'M9,10 C8.5,10 8,10.5454545 8.01,11.0909091 L8,20.9090909 C8,21.4545455 8.5,22 9,22 L19,22 C19.5,22 20,21.4545455 20,20.9090909 L20,11.0909091 C20,10.5 19.5,10 19,10 L9,10 Z M9,21 L9,11 L19,11 L19,21 L9,21 Z M12.0000954,7 C11.7691104,6.99999999 10.9900954,7.54545458 11.0000954,8.09090912 L11.0000954,9.00000004 L12.0000954,9 L12.0000954,8.09090912 L22.0000953,8.09090912 L22.0000953,18 L21.0000953,18 L21.0000953,19 L22.0000953,19 C22.5000953,19 23.0000954,18.5 23.0000953,18 L23.0000953,8.09090912 C23.0000954,7.5 22.5000953,7 22.0000953,7 L12.0000954,7 Z',
	'cross': 'M14.6568542,13.2426407 L10.4142136,9 L9,10.4142136 L13.2426407,14.6568542 L9,18.8994949 L10.4142136,20.3137085 L14.6568542,16.0710678 L18.8994949,20.3137085 L20.3137085,18.8994949 L16.0710678,14.6568542 L20.3137085,10.4142136 L18.8994949,9 L14.6568542,13.2426407 Z',
	'cross-small': 'M14.5355339,13.8284271 L11.7071068,11 L11,11.7071068 L13.8284271,14.5355339 L11,17.363961 L11.7071068,18.0710678 L14.5355339,15.2426407 L17.363961,18.0710678 L18.0710678,17.363961 L15.2426407,14.5355339 L18.0710678,11.7071068 L17.363961,11 L14.5355339,13.8284271 Z',
	'comment': 'M10,9 L20,9 C20.5,9 21,9.5 21,10 L21,19 C21,19.5 20.5,20 20,20 L12,20 L9,23 L9,10 C9,9.5 9.5,9 10,9 Z',
	'contact': 'M15,15 C16.6575,15 18,13.6575 18,12 C18,10.3425 16.6575,9 15,9 C13.3425,9 12,10.3425 12,12 C12,13.6575 13.3425,15 15,15 L15,15 Z M9,20 L9,21 L21,21 L21,20 C21,17.5 18.5,16 15,16 C11.5,16 9,17.5 9,20 Z',
	'currency': 'M16.3325558,10.1529167 C16.7048685,10.0531795 17.0962239,10 17.5,10 C19.9852814,10 22,12.0147186 22,14.5 C22,16.9852814 19.9852814,19 17.5,19 C17.0962239,19 16.7048685,18.9468205 16.3325558,18.8470833 C17.3691455,17.6954791 18,16.1714116 18,14.5 C18,12.8285884 17.3691455,11.3045209 16.3325558,10.1529167 Z M11.5,19 C13.9852814,19 16,16.9852814 16,14.5 C16,12.0147186 13.9852814,10 11.5,10 C9.01471863,10 7,12.0147186 7,14.5 C7,16.9852814 9.01471863,19 11.5,19 Z',
	'cycle': 'M8,15 C8,18.8733333 11.1266667,22 15,22 C16.9366667,22 18.6866667,21.2183333 19.9525,19.9525 L18.89125,18.89125 C17.8966667,19.8858333 16.5216667,20.5 15,20.5 C11.9566667,20.5 9.5,18.0433333 9.5,15 L12,15 L9,12 L6,15 L8,15 Z M22,15 C22,11.1266667 18.8733333,8 15,8 C13.0633334,8 11.3133334,8.78166663 10.0475001,10.0474999 L11.10875,11.10875 C12.1033334,10.1141666 13.4783334,9.5 15,9.5 C18.0433333,9.5 20.5,11.9566667 20.5,15 L18,15 L21,18 L24,15 L22,15 Z',
	'date-due': 'M21,14.0995035 L21,10 C21,9.5 20.5,9 20,9 L19,9 L19,8 L17,8 L17,9 L13,9 L13,8 L11,8 L11,9 L10,9 C9.5,9 9,9.5 9.01,10 L9,20 C9,20.5 9.5,21 10,21 L15.4142962,21 C15.2760707,20.6825875 15.1697953,20.3479097 15.0995035,20 L10,20 L10,12 L20,12 L20,14 C20.3425868,14 20.6769961,14.0342437 21,14.0995035 Z M15,19 C15,16.2333333 17.2333333,14 20,14 C22.7666667,14 25,16.2333333 25,19 C25,21.7666667 22.7666667,24 20,24 C17.2333333,24 15,21.7666667 15,19 Z M16,19 C16,16.7866667 17.7866667,15 20,15 C22.2133333,15 24,16.7866667 24,19 C24,21.2133333 22.2133333,23 20,23 C17.7866667,23 16,21.2133333 16,19 Z M19,17 L20,17 L20,19 L22,19 L22,20 L20.5,20 L19,20 L19,17 Z',
	'date-end': 'M19,9 L19,8 L17,8 L17,9 L13,9 L13,8 L11,8 L11,9 L10,9 C9.5,9 9,9.5 9.01,10 L9,20 C9,20.5 9.5,21 10,21 L20,21 C20.5,21 21,20.5 21,20 L21,10 C21,9.5 20.5,9 20,9 L19,9 Z M10,20 L10,12 L20,12 L20,20 L10,20 Z M16,16 L19,16 L19,19 L16,19 L16,16 Z',
	'date-start': 'M19,9 L19,8 L17,8 L17,9 L13,9 L13,8 L11,8 L11,9 L10,9 C9.5,9 9,9.5 9.01,10 L9,20 C9,20.5 9.5,21 10,21 L20,21 C20.5,21 21,20.5 21,20 L21,10 C21,9.5 20.5,9 20,9 L19,9 Z M10,20 L10,12 L20,12 L20,20 L10,20 Z M11,13 L14,13 L14,16 L11,16 L11,13 Z',
	'deposit': 'M10.9658935,16 L9.33987019,16 C10.1614096,18.3331127 12.3816735,20 15,20 C17.6183265,20 19.8385904,18.3331127 20.6601298,16 L19.0341065,16 C18.2992493,17.4831582 16.7710386,18.5 15,18.5 C13.2289614,18.5 11.7007507,17.4831582 10.9658935,16 Z M12,13 L18,13 L15,16 L12,13 Z M14,8 L16,8 L16,13 L14,13 L14,8 Z',
	'desktop': 'M8,8 C7.5,8 7,8.5 7.01,9 L7,18 C7,18.5 7.5,19 8,19 L22,19 C22.5,19 23,18.5 23,18 L23,9 C23,8.5 22.5,8 22,8 L8,8 Z M13,19 L17,19 L18,22 L12,22 L13,19 Z M8,16 L8,9 L22,9 L22,16 L8,16 Z',
	'discount': 'M9,10 C9,10 21,10 21,10 C21.5,10 22,10.5 22,11 C22,11 22,14 22,14 C22,14 21,14 21,15 C21,16 22,16 22,16 C22,16 22,19 22,19 C22,19.5 21.5,20 21,20 L9,20 C8.5,20 8,19.5 8,19 C8,18.0178248 8.00000047,16 8.00000047,16 C8.00000047,16 9,16 9,15 C9,14 8.00000047,14 8.00000047,14 L8,11 C8,10.5 8.5,10 9,10 Z M15,17 L12.648859,18.236068 L13.097887,15.618034 L11.1957739,13.763932 L13.8244295,13.381966 L15,11 L16.1755705,13.381966 L18.8042261,13.763932 L16.902113,15.618034 L17.351141,18.236068 L15,17 Z',
	'document': 'M10,7 C9.5,7 9,7.54545455 9.01,8.09090909 L9,20.9090909 C9,21.4545455 9.5,22 10,22 L20,22 C20.5,22 21,21.4545455 21,20.9090909 L21,11 L17,7 L10,7 Z M10,21 L10,8 L16,8 L20,12 L20,21 L10,21 Z M16,8 L20,12 L16,12 L16,8 Z',
	'down': 'M14,17 L11,14 L9.5,15.5 L15,21 L20.5,15.5 L19,14 L16,17 L16,8 L14,8 L14,17 Z',
	'download': /*** @deprecated Use import instead ***/ 'M12,15 L18,15 L15,18 L12,15 Z M14,9 L16,9 L16,15 L14,15 L14,9 Z M10,20 L20,20 L20,21 L10,21 L10,20 Z',
	'drag': 'M16,10 L18,10 L18,12 L16,12 L16,10 Z M12,10 L14,10 L14,12 L12,12 L12,10 Z M12,14 L14,14 L14,16 L12,16 L12,14 Z M16,14 L18,14 L18,16 L16,16 L16,14 Z M16,18 L18,18 L18,20 L16,20 L16,18 Z M12,18 L14,18 L14,20 L12,20 L12,18 Z',
	'edit': 'M12.5251263,20.8033009 L20.3033009,13.0251263 L17.4748737,10.1966991 L9.69669914,17.9748737 L8.98959236,18.6819805 L8.98959236,21.5104076 L11.8180195,21.5104076 L12.5251263,20.8033009 Z M18.8890873,8.78248558 C19.2426407,8.42893219 19.9497475,8.42893219 20.3033009,8.78248558 L21.7175144,10.1966991 C22.0710678,10.5502525 22.0710678,11.2573593 21.7175144,11.6109127 L21.0104076,12.3180195 L18.1819805,9.48959236 L18.8890873,8.78248558 Z',
	'email': 'M9,10 L20,10 C20.5,10 21,10.5 21,11 C21,11 21,19 21,19 C21,19.5 20.5,20 20,20 L9,20 C8.5,20 8,19.5 8,19 L8,11 C8,10.5 8.5,10 9,10 Z M9,13 L9,11 L14.5,15 L20,11 L20,13 L14.5,17 L9,13 Z',
	'export': 'M12,12 L18,12 L15,9 L12,12 Z M14,12 L16,12 L16,18 L14,18 L14,12 Z M10,20 L20,20 L20,21 L10,21 L10,20 Z',
	'external': 'M19.75,11.75 L21,13 L21,10.5 L21,12 L21,9 L15,9 L15,10 L10,10 L10,20 L20,20 L20,15 L21,15 L21,12 L21,19.9090909 C21,20.4545455 20.5,21 20,21 L10,21 C9.5,21 9,20.4545455 9,19.9090909 L9.01,10.0909091 C9,9.54545455 9.5,9 10,9.00000001 L21,9.00000001 L21,10.5 L21,9 L17,9 L18.25,10.25 L14.5,14 L16,15.5 L19.75,11.75 Z',
	'file': 'M10,9 L20,9 C20.5,9 21,9.5 21,10 C21,10 21,20 21,20 C21,20.5 20.5,21 20,21 L10,21 C9.5,21 9,20.5 9,20 C9,18.7231722 9,10 9,10 C9,9.5 9.5,9 10,9 Z M14,18 L16,18 L16,19 L14,19 L14,18 Z M17,18 L19,18 L19,19 L17,19 L17,18 Z M11,18 L13,18 L13,19 L11,19 L11,18 Z',
	'filter': 'M18,14 L22,14 L22,16 L16.5,16 L18,14 Z M15,18 L22,18 L22,20 L15,20 L15,18 Z M19,10 L22,10 L22,12 L19,12 L19,10 Z M17,11 L17,10.0762939 L17,9 L7,9 L7,11 L11,16 L11,20 L13,20 L13,16 L17,11 Z',
	'folder': 'M14,11 L12,9 L9,9 C8.5,9 8,9.5 8.01,10 L8,20 C8,20.5 8.5,21 9,21 L21,21 C21.5,21 22,20.5 22,20 L22,12 C22,11.5 21.5,11 21,11 L14,11 Z M9,20 L9,12 L21,12 L21,20 L9,20 Z',
	'footer': 'M20,20 L10,20.0000001 L10,9 L9,9 L9,20 C9,20.5454546 9.5,21 10,21 L20,21 C20.5,21 21,20.5454546 21,20 L21,9 L20,9 L20,20 Z M11,16 L11,19 L19,19 L19,16 L11,16 Z',
	'grid': 'M8.92857143,8.00000001 C8.46428571,8 8,8.50649351 8.00928571,9.01298701 L8,19.987013 C8,20.4935065 8.46428571,21 8.92857143,21 L20.0714286,21 C20.5357143,21 21,20.4935065 21,19.987013 L21,9.01298705 C21,8.46428571 20.5357143,8.00000001 20.0714286,8.00000001 L8.92857143,8.00000001 Z M9,9 L12,9 L12,12 L9,12 L9,9 Z M9,13 L12,13 L12,16 L9,16 L9,13 Z M9,17 L12,17 L12,20 L9,20 L9,17 Z M13,17 L16,17 L16,20 L13,20 L13,17 Z M13,13 L16,13 L16,16 L13,16 L13,13 Z M13,9 L16,9 L16,12 L13,12 L13,9 Z M17,9 L20,9 L20,12 L17,12 L17,9 Z M17,13 L20,13 L20,16 L17,16 L17,13 Z M17,17 L20,17 L20,20 L17,20 L17,17 Z',
	'hash': 'M16.7837544,16 L13.25,16 L13.875,13.5 L17.4256316,13.5 L16.7837544,16 Z M18.25,16 L21,16 L20.5,17.5 L17.875,17.5 L17,21 L15.5,20.9999999 L16.3986281,17.5 L12.875,17.5 L12,21 L10.5,20.9999999 L11.3986607,17.5 L8.5,17.5 L9,16 L11.783801,16 L12.4257015,13.5 L9.5,13.5 L10,12 L12.8108418,12 L13.5784699,9.01033076 L14.9999999,9 L14.25,12 L17.8107579,12 L18.5757961,9.02030951 L19.9999999,9 L19.25,12 L22,12 L21.5,13.5 L18.875,13.5 L18.25,16 Z',
	'help': 'M15.5,22 C19.6421356,22 23,18.6421356 23,14.5 C23,10.3578644 19.6421356,7 15.5,7 C11.3578644,7 8,10.3578644 8,14.5 C8,18.6421356 11.3578644,22 15.5,22 Z M14.509,16.998 L14.509,19 L16.55,19 L16.55,16.998 L14.509,16.998 Z M12.416,12.708 L14.327,12.708 C14.327,12.4739988 14.3529997,12.2551677 14.405,12.0515 C14.4570003,11.8478323 14.5371661,11.6701674 14.6455,11.5185 C14.7538339,11.3668326 14.8924992,11.2455005 15.0615,11.1545 C15.2305008,11.0634995 15.4319988,11.018 15.666,11.018 C16.0126684,11.018 16.283499,11.1133324 16.4785,11.304 C16.673501,11.4946676 16.771,11.7893313 16.771,12.188 C16.7796667,12.4220012 16.7385005,12.6169992 16.6475,12.773 C16.5564995,12.9290008 16.4373341,13.0719993 16.29,13.202 C16.1426659,13.3320006 15.9823342,13.4619993 15.809,13.592 C15.6356658,13.7220006 15.4710008,13.8758324 15.315,14.0535 C15.1589992,14.2311676 15.0225006,14.4456654 14.9055,14.697 C14.7884994,14.9483346 14.7170001,15.2603315 14.691,15.633 L14.691,16.218 L16.446,16.218 L16.446,15.724 C16.4806668,15.4639987 16.565166,15.2473342 16.6995,15.074 C16.833834,14.9006658 16.9876658,14.746834 17.161,14.6125 C17.3343342,14.478166 17.518499,14.343834 17.7135,14.2095 C17.908501,14.075166 18.0861659,13.9126676 18.2465,13.722 C18.4068341,13.5313324 18.5411661,13.301668 18.6495,13.033 C18.7578339,12.764332 18.812,12.4220021 18.812,12.006 C18.812,11.7546654 18.7578339,11.4838348 18.6495,11.1935 C18.5411661,10.9031652 18.3613346,10.6323346 18.11,10.381 C17.8586654,10.1296654 17.5271687,9.91950084 17.1155,9.7505 C16.7038313,9.58149915 16.1903364,9.497 15.575,9.497 C15.098331,9.497 14.6671686,9.57716586 14.2815,9.7375 C13.8958314,9.89783414 13.5665014,10.1209986 13.2935,10.407 C13.0204986,10.6930014 12.8081674,11.030998 12.6565,11.421 C12.5048326,11.811002 12.4246667,12.2399977 12.416,12.708 Z',
	'highlight': 'M8,21 L22,21 L22,22 L8,22 L8,21 Z M8,20 L11,17 L13,19 L12,20 L8,20 Z M12,16 L14,18 L16,18 L22,12 L18,8 L12,14 L12,16 Z',
	'image': 'M14.0588235,17.5882353 L16,15 L19,19 L14,19 L11,19 L13,16 L14.0588235,17.5882353 Z M10,9 L20,9 C20.5,9 21,9.5 21,10 C21,10 21,20 21,20 C21,20.5 20.5,21 20,21 L10,21 C9.5,21 9,20.5 9,20 C9,18.7231722 9,10 9,10 C9,9.5 9.5,9 10,9 Z',
	'import': 'M12,15 L18,15 L15,18 L12,15 Z M14,9 L16,9 L16,15 L14,15 L14,9 Z M10,20 L20,20 L20,21 L10,21 L10,20 Z',
	'italic': 'M13,9L13 11 15 11 13 18 11 18 11 20 17 20 17 18 15 18 17 11 19 11 19 9 Z',
	'link': 'M7,15 C7,12.790861 8.78883037,11 10.9962027,11 L19.0037973,11 C21.2108391,11 23,12.7953562 23,15 C23,17.209139 21.2111696,19 19.0037973,19 L10.9962027,19 C8.78916089,19 7,17.2046438 7,15 Z M8.5,15 C8.5,13.5 9.5,12.5 11,12.5 L14,12.5 L14,11 L16,11 L16,12.5 L19,12.5 C20.5,12.5 21.5,13.75 21.5,15 C21.5,16.25 20.5,17.5 19,17.5 L16,17.5 L16,19 L14,19 L14,17.5 L11,17.5 C9.5,17.4761334 8.5,16.5 8.5,15 Z M12,14 L18,14 L18,16 L12,16 L12,14 Z',
	'list': 'M13,10 L21,10 L21,12 L13,12 L13,10 Z M9,10 L11,10 L11,12 L9,12 L9,10 Z M9,14 L11,14 L11,16 L9,16 L9,14 Z M13,14 L21,14 L21,16 L13,16 L13,14 Z M13,18 L21,18 L21,20 L13,20 L13,18 Z M9,18 L11,18 L11,20 L9,20 L9,18 Z',
	'location': 'M15,22 C15,22 20,16.7614237 20,13 C20,10.2399998 17.7614237,8 15,8 C12.2385763,8 10,10.2399998 10,13 C10,16.7614237 15,22 15,22 Z M15,15 C16.1045695,15 17,14.1045695 17,13 C17,11.8954305 16.1045695,11 15,11 C13.8954305,11 13,11.8954305 13,13 C13,14.1045695 13.8954305,15 15,15 Z',
	'lock': 'M19,11 C19,8.790861 17.209139,7 15,7 C12.790861,7 11,8.790861 11,11 C11,11 19,11 19,11 Z M17.5,11 C17.5,9.61928813 16.3807119,8.5 15,8.5 C13.6192881,8.5 12.5,9.61928813 12.5,11 L17.5,11 Z M11,11 L12.5,11 L12.5,13 L11,13 L11,11 Z M17.5,11 L19,11 L19,13 L17.5,13 L17.5,11 Z M10,13 L20,13 C20.5,13 21,13.5 21,14 C21,14 21,22 21,22 C21,22.5 20.5,23 20,23 L10,23 C9.5,23 9,22.5 9,22 C9,20.7231722 9,14 9,14 C9,13.5 9.5,13 10,13 Z M15,19 C15.5522847,19 16,18.5522847 16,18 C16,17.4477153 15.5522847,17 15,17 C14.4477153,17 14,17.4477153 14,18 C14,18.5522847 14.4477153,19 15,19 Z',
	'menu': 'M9,10 L21,10 L21,12 L9,12 L9,10 Z M9,14 L21,14 L21,16 L9,16 L9,14 Z M9,18 L21,18 L21,20 L9,20 L9,18 Z',
	'merge': 'M19,16 L14.5,16 L9.5,11 L11,9.5 L15.5,14 L19,14 L19,12 L22,15 L19,18 L19,16 Z M11,20.5 L14,17.5 L12.5,16 L9.5,19 L11,20.5 Z',
	'mobile': 'M11,8 C10.5,8 10,8.5 10.01,9 L10,21 C10,21.5 10.5,22 11,22 L18,22 C18.5,22 19,21.5 19,21 L19,9 C19,8.5 18.5,8 18,8 L11,8 Z M11,19 L11,11 L18,11 L18,19 L11,19 Z',
	'notes': 'M9,10 L21,10 L21,12 L9,12 L9,10 Z M9,14 L21,14 L21,16 L9,16 L9,14 Z M9,18 L16,18 L16,20 L9,20 L9,18 Z',
	'notification': 'M16,21 L13,21 C13,23 16,23 16,21 Z M19,17 L19,14 C19,11 16.9563508,9.99999998 15.9563508,9.99999998 C15.9563508,9.99999998 15.9563508,8.99999992 15.9563508,8.99999995 C15.9563508,6.99999998 13.0295172,7.00000001 13.0295172,8.99999996 L13.0295172,9.99999998 C12.0295172,9.99999997 10,11 10,14 L10,17 L8,19 L8,20 L21,20 L21,19 L19,17 Z',
	'number-list': 'M9,10 L8,10 L9,9 L10,9 L10,13 L11,13 L11,14 L8,14 L8,13 L9,13 L9,10 Z M8,16 L11,16 L11,19 L8.99999994,19 L8.99999994,20 L11.0000001,20 L11.0000001,21 L8,21 L8,18 L10,18 L10,17 L8,17 L8,16 Z M13,11 L21,11 L21,13 L13,13 L13,11 Z M13,17 L21,17 L21,19 L13,19 L13,17 Z',
	'oncharge': 'M9.00703704,13 L9.01,10.0909091 C9,9.54545455 9.5,9 10,9 L20,9 C20.5,9 21,9.5 21,10 L21,19.9090909 C21,20.4545455 20.5,21 20,21 L10,21 C9.5,21 9,20.4545455 9,19.9090909 L9.00296296,17 L10,17 L10,20 L20,20 L20,10 L10,10 L10,13 L9.00703704,13 Z M15,12 L15,18 L18,15 L15,12 Z M9,14 L15,14 L15,16 L9,16 L9,14 Z',
	'overflow': 'M14.5,11 C15.3284271,11 16,10.3284271 16,9.5 C16,8.67157288 15.3284271,8 14.5,8 C13.6715729,8 13,8.67157288 13,9.5 C13,10.3284271 13.6715729,11 14.5,11 Z M14.5,21 C15.3284271,21 16,20.3284271 16,19.5 C16,18.6715729 15.3284271,18 14.5,18 C13.6715729,18 13,18.6715729 13,19.5 C13,20.3284271 13.6715729,21 14.5,21 Z M14.5,16 C15.3284271,16 16,15.3284271 16,14.5 C16,13.6715729 15.3284271,13 14.5,13 C13.6715729,13 13,13.6715729 13,14.5 C13,15.3284271 13.6715729,16 14.5,16 Z',
	'payment': 'M16,19.9376781 C16.2700477,19.8998311 16.5224521,19.8447461 16.7572151,19.772423 C17.2496985,19.6207043 17.6623136,19.4087475 17.9950726,19.1365462 C18.3278317,18.8643449 18.5785064,18.5408319 18.7471044,18.1659973 C18.9157023,17.7911628 19,17.3850981 19,16.9477912 C19,16.4123133 18.8868636,15.9727817 18.6605874,15.6291834 C18.4343113,15.2855851 18.1658897,15.0111568 17.8553145,14.8058902 C17.5447394,14.6006237 17.2319506,14.4511384 16.9169386,14.3574297 C16.6019267,14.2637211 16.3556887,14.1990185 16.1782172,14.1633199 C15.5836877,14.0116012 15.1023034,13.8866582 14.73405,13.7884873 C14.3657967,13.6903163 14.0774098,13.5921469 13.8688808,13.4939759 C13.6603518,13.395805 13.5205951,13.288711 13.4496065,13.1726908 C13.3786179,13.0566705 13.3431241,12.9049541 13.3431241,12.7175368 C13.3431241,12.5122703 13.3874913,12.3427048 13.476227,12.2088353 C13.5649628,12.0749659 13.6780992,11.9634096 13.8156396,11.8741633 C13.95318,11.784917 14.1062469,11.7224455 14.2748448,11.686747 C14.4434428,11.6510485 14.6120382,11.6331995 14.7806361,11.6331995 C15.0379698,11.6331995 15.2753343,11.6555107 15.4927369,11.7001339 C15.7101395,11.744757 15.9031369,11.8206153 16.0717348,11.9277108 C16.2403328,12.0348064 16.3756527,12.1820606 16.4776989,12.3694779 C16.579745,12.5568952 16.6396407,12.7933944 16.6573879,13 L18.6805529,13 C18.6805529,12.5256554 18.5762899,12.0548882 18.3677609,11.6666667 C18.1592319,11.2784452 17.8775001,10.9593944 17.5225571,10.7095047 C17.1676141,10.459615 16.7616541,10.2788939 16.304665,10.167336 C16.204077,10.142781 16.1025221,10.1209284 16,10.1017782 L16,8 L14,8 L14,10.0813836 C13.8653399,10.1064671 13.7306801,10.1373491 13.5960197,10.1740295 C13.1700881,10.2900497 12.7885301,10.4685396 12.4513342,10.7095047 C12.1141384,10.9504697 11.84128,11.2516716 11.632751,11.6131191 C11.424222,11.9745667 11.3199591,12.4007115 11.3199591,12.8915663 C11.3199591,13.3288732 11.4020384,13.701471 11.5661995,14.0093708 C11.7303607,14.3172706 11.9455416,14.5738499 12.2117489,14.7791165 C12.4779562,14.984383 12.7796532,15.1517173 13.1168491,15.2811245 C13.4540449,15.4105317 13.8001092,15.5198568 14.1550522,15.6091031 C14.5011216,15.707274 14.8427491,15.796519 15.179945,15.8768407 C15.5171408,15.9571624 15.8188379,16.0508696 16.0850451,16.1579652 C16.3512524,16.2650608 16.5664333,16.3989282 16.7305945,16.5595716 C16.8947556,16.720215 16.976835,16.9299407 16.976835,17.188755 C16.976835,17.4297201 16.9147209,17.6282902 16.7904908,17.7844712 C16.6662608,17.9406523 16.5109755,18.0633641 16.3246305,18.1526104 C16.1382854,18.2418568 15.9386329,18.3020971 15.7256671,18.3333333 C15.5127013,18.3645695 15.3130489,18.3801874 15.1267038,18.3801874 C14.851623,18.3801874 14.5854197,18.3467205 14.328086,18.2797858 C14.0707523,18.2128511 13.8466979,18.1102193 13.655916,17.9718876 C13.4651342,17.8335558 13.3120673,17.6528347 13.1967108,17.4297189 C13.0813544,17.2066031 13.0799999,17.188755 13.023677,17 L11.0005119,17 C10.9916384,17.2021448 11.0981197,17.7108412 11.3199591,18.1392236 C11.5417984,18.5676059 11.8412771,18.9201236 12.2184041,19.1967871 C12.595531,19.4734507 13.0303297,19.6764831 13.5228131,19.8058902 C13.6802883,19.8472691 13.8393504,19.8820323 14,19.9101799 L14,22 L16,22 L16,19.9376781 Z',
	'pdf': 'M10,9 L20,9 C20.5,9 21,9.5 21,10 C21,10 21,20 21,20 C21,20.5 20.5,21 20,21 L10,21 C9.5,21 9,20.5 9,20 C9,18.7231722 9,10 9,10 C9,9.5 9.5,9 10,9 Z M11.6721798,19.10268 C11.4691015,19.10268 11.2830298,19.02368 11.1339724,18.87468 C10.9448995,18.68568 10.8668694,18.44368 10.9128872,18.19168 C10.9699091,17.88268 11.197997,17.45768 12.4374747,16.87368 C12.9706802,15.80368 13.4998841,14.31368 13.7509809,13.18168 C13.3058093,12.47768 13.1607534,11.96068 13.2958054,11.56568 C13.3808382,11.31768 13.5699111,11.13268 13.8300113,11.04568 C14.1551366,10.93768 14.4722588,11.02468 14.6693348,11.26568 C14.8414011,11.47568 15.0074651,11.85868 14.8133903,12.96768 C15.4136216,13.80968 16.392999,14.85468 17.2533305,15.57168 C18.7369022,15.50768 18.9899998,16.14168 18.9899998,16.52068 C18.9899998,16.95668 18.7008884,17.26068 18.2877291,17.26068 C18.0756474,17.26068 17.7085059,17.18968 16.9392095,16.60068 C15.8487893,16.72368 14.3242018,17.14368 13.1657553,17.64268 C12.622546,18.65068 12.1583671,19.10268 11.6721798,19.10268 Z M13.8600229,16.25768 C14.5302812,16.03168 15.2345526,15.84368 15.8858035,15.71068 C15.4196239,15.26568 14.9284346,14.78468 14.5312816,14.30568 C14.3442095,14.94868 14.1201231,15.62168 13.8600229,16.25768 Z',
	'phone': 'M15.7297573,19.1502587 C13.4135429,18.4155114 11.5844886,16.5864571 10.8497413,14.2702427 C11.7367708,13.4910568 13,12.324452 13,12 C13,12 13,10 13,10 C13,9.5 12.5,9 12,9 C12,9 10,9 10,9 C9.5,9 9,9.5 9,10 L9,12 C9,16.9705627 13.0294373,21 18,21 L20.003418,21 C20.503418,21 21.003418,20.5 21.003418,20 C21.003418,20 21.003418,18 21.003418,18 C21.003418,17.5 20.503418,17 20.003418,17 L18,17 C17.675548,17 16.5089432,18.2632292 15.7297573,19.1502587 Z',
	'photo': 'M9,10 L11,10 L13,8 L17,8 L19,10 L21,10 C21.5,10 22,10.5 22,11 C22,11 22,19 22,19 C22,19.5 21.5,20 21,20 L9,20 C8.5,20 8,19.5 8,19 C8,17.7231722 8,11 8,11 C8,10.5 8.5,10 9,10 Z M15,18 C16.6568542,18 18,16.6568542 18,15 C18,13.3431458 16.6568542,12 15,12 C13.3431458,12 12,13.3431458 12,15 C12,16.6568542 13.3431458,18 15,18 Z M15,17 C16.1045695,17 17,16.1045695 17,15 C17,13.8954305 16.1045695,13 15,13 C13.8954305,13 13,13.8954305 13,15 C13,16.1045695 13.8954305,17 15,17 Z',
	'plus': 'M16,14 L16,9 L14,9 L14,14 L9,14 L9,16 L14,16 L14,21 L16,21 L16,16 L21,16 L21,14 L16,14 Z',
	'plus-small': 'M15,14 L15,10 L14,10 L14,14 L10,14 L10,15 L14,15 L14,19 L15,19 L15,15 L19,15 L19,14 L15,14 Z',
	'print': 'M8.99622154,12 C8.4960641,12 7.99590667,12.5 8.00590982,13 L8,19 L10.9968514,19 L10.9968514,21 L17.9990554,21 L17.9990554,19 L21,19 L21,13 C21,12.5 20.4998426,12 19.9996851,12 L8.99622154,12 Z M11.9971662,20 L11.9971662,17.9447403 L16.9987405,17.9447403 L16.9987405,20 L11.9971662,20 Z M19,15 C19.5522847,15 20,14.5522847 20,14 C20,13.4477153 19.5522847,13 19,13 C18.4477153,13 18,13.4477153 18,14 C18,14.5522847 18.4477153,15 19,15 Z M11.0009446,9 L18.0031487,9 L18.0031487,11 L11.0009446,11 L11.0009446,9 Z',
	'radio-check': 'M11,15a4,4 0 1,0 8,0a4,4 0 1,0 -8,0 Z',
	'radio-main': 'M6,15a9,9 0 1,0 18,0a9,9 0 1,0 -18,0 Z',
	'recent': 'M8,15 C8,11.1266667 11.1266667,8 15,8 C18.8733333,8 22,11.1266667 22,15 C22,18.8733333 18.8733333,22 15,22 C13.0814552,22 11.3461,21.2328934 10.0831611,19.9879067 L11.1444458,18.926622 C12.1361046,19.9003748 13.4964553,20.5 15,20.5 C18.0433333,20.5 20.5,18.0433333 20.5,15 C20.5,11.9566667 18.0433333,9.5 15,9.5 C11.9566667,9.5 9.5,11.9566667 9.5,15 L12,15 L9,18 L6,15 L8,15 Z M14,12 L15,12 L15,15 L18,15 L18,16 L15.5,16 L14,16 L14,12 Z',
	'row': 'M8,15 L8,19.9090909 C8,20.4545455 8.5,21 9,21 L20,21 C20.5,21 21,20.4545455 21,19.9090909 L21,15 L8,15 Z M9,20 L9,16 L20,16 L20,20 L9,20 Z M9,8.00000001 C8.5,8 8,8.54545455 8.01,9.09090909 L8,14 L21,14 L21,9.09090913 C21,8.5 20.5,8.00000001 20,8.00000001 L9,8.00000001 Z',
	'search': 'M18.8929126,17.4786991 C19.5903306,16.4982449 20,15.2980382 20,14 C20,10.68 17.32,8 14,8 C10.68,8 8,10.68 8,14 C8,17.32 10.68,20 14,20 C15.2980382,20 16.4982449,19.5903306 17.4786991,18.8929126 L21.4142136,22.8284271 L22.8284271,21.4142136 L18.8929126,17.4786991 Z M14,18.5 C11.51,18.5 9.5,16.49 9.5,14 C9.5,11.51 11.51,9.5 14,9.5 C16.49,9.5 18.5,11.51 18.5,14 C18.5,16.49 16.49,18.5 14,18.5 Z',
	'settings': 'M16,20.8260682 C17.2302791,20.5354551 18.3254805,19.8952388 19.1749517,19.0160719 L20.1830127,19.5980762 C20.6160254,19.8480762 21.2990381,19.6650635 21.5490381,19.2320508 L22.0490381,18.3660254 C22.2990381,17.9330127 22.1160254,17.25 21.6830127,17 L20.7067057,16.4363289 C20.8973068,15.8247281 21,15.1743567 21,14.5 C21,13.8562168 20.9064074,13.2342934 20.7320863,12.6470938 L21.6830127,12.0980762 C22.1160254,11.8480762 22.2990381,11.1650635 22.0490381,10.7320508 L21.5490381,9.8660254 C21.2990381,9.4330127 20.6160254,9.25 20.1830127,9.5 L19.2352601,10.0471852 C18.377601,9.13547233 17.2595966,8.4714702 16,8.17393184 L16,7 C16,6.5 15.5,6 15,6 L14,6 C13.5,6 13,6.5 13,7 L13,8.17393184 C11.7404034,8.4714702 10.622399,9.13547233 9.76473986,10.0471852 L8.8169873,9.5 C8.3839746,9.25 7.70096189,9.4330127 7.45096189,9.8660254 L6.95096189,10.7320508 C6.70096189,11.1650635 6.8839746,11.8480762 7.3169873,12.0980762 L8.26791374,12.6470938 C8.09359263,13.2342934 8,13.8562168 8,14.5 C8,15.1743567 8.10269322,15.8247281 8.29329431,16.4363289 L7.3169873,17 C6.8839746,17.25 6.70096189,17.9330127 6.95096189,18.3660254 L7.45096189,19.2320508 C7.70096189,19.6650635 8.3839746,19.8480762 8.8169873,19.5980762 L9.82504832,19.0160719 C10.6745195,19.8952388 11.7697209,20.5354551 13,20.8260682 L13,22 C13,22.5 13.5,23 14,23 L15,23 C15.5,23 16,22.5 16,22 L16,20.8260682 Z M14.5,17.5 C16.1568542,17.5 17.5,16.1568542 17.5,14.5 C17.5,12.8431458 16.1568542,11.5 14.5,11.5 C12.8431458,11.5 11.5,12.8431458 11.5,14.5 C11.5,16.1568542 12.8431458,17.5 14.5,17.5 Z',
	'sheet': 'M10,9 L20,9 C20.5,9 21,9.5 21,10 C21,10 21,20 21,20 C21,20.5 20.5,21 20,21 L10,21 C9.5,21 9,20.5 9,20 C9,18.7231722 9,10 9,10 C9,9.5 9.5,9 10,9 Z M13.6666667,14 L16.3333333,14 L19,14 L19,15.6666667 L19,17.3333333 L19,19 L16.3333333,19 L13.6666667,19 L11,19 L11,17.3333333 L11,15.6666667 L11,14 L13.6666667,14 Z M12,15 L13,15 L13,16 L12,16 L12,15 Z M12,17 L13,17 L13,18 L12,18 L12,17 Z M14,17 L18,17 L18,18 L14,18 L14,17 Z M14,15 L18,15 L18,16 L14,16 L14,15 Z',
	'shipping': 'M9,19 L8,19 L8,10 C8,9.5 8.5,9 9,9 L18,9 L18,12 L20,12 L23,15 L23,19 L22,19 C22,20.1045695 21.1045695,21 20,21 C18.8954305,21 18,20.1045695 18,19 L13,19 C13,20.1045695 12.1045695,21 11,21 C9.8954305,21 9,20.1045695 9,19 Z M18,13 L19.5,13 L21.5,15 L18,15 L18,13 Z M11,20 C11.5522847,20 12,19.5522847 12,19 C12,18.4477153 11.5522847,18 11,18 C10.4477153,18 10,18.4477153 10,19 C10,19.5522847 10.4477153,20 11,20 Z M20,20 C20.5522847,20 21,19.5522847 21,19 C21,18.4477153 20.5522847,18 20,18 C19.4477153,18 19,18.4477153 19,19 C19,19.5522847 19.4477153,20 20,20 Z',
	'split': 'M17.25,19.75 L16,21 L20,21 L20,17 L18.75,18.25 L16.5,16 L15,17.5 L17.25,19.75 Z M17.25,10.25 L16,9 L20,9 L20,13 L18.75,11.75 L14.5,16 L13.5,14 L17.25,10.25 Z M8,14 L13.5,14 L14.5,16 L8,16 L8,14 Z',
	'star': 'M15 6l2.781 5.926 6.219.949-4.5 4.613L20.562 24 15 20.925 9.438 24l1.062-6.512L6 12.875l6.219-.949 Z',
	'social-facebook': 'M13.149022,22 L13.149022,15.6139798 L11,15.6139798 L11,13.1251898 L13.149022,13.1251898 L13.149022,11.2897998 C13.149022,9.15980828 14.4498905,8 16.3500335,8 C17.2601596,8 18.042386,8.0677806 18.2704427,8.09805635 L18.2704427,10.3240035 L16.9525209,10.3246213 C15.9191911,10.3246213 15.719124,10.8156445 15.719124,11.5362073 L15.719124,13.1251898 L18.1835699,13.1251898 L17.862647,15.6139798 L15.719124,15.6139798 L15.719124,22 L13.149022,22 Z',
	'social-linkedin': 'M11,21 L11,12 L8,12 L8,21 L11,21 L11,21 Z M9.48964005,10.25 C10.5746644,10.25 11.25,9.52774685 11.25,8.62513916 C11.2297787,7.70221375 10.5746644,7 9.51022144,7 C8.44588926,7 7.75,7.70221375 7.75,8.62513916 C7.75,9.52774685 8.42519707,10.25 9.46936337,10.25 L9.48958465,10.25 L9.48964005,10.25 Z M16,21 L16,16.0706181 C16,15.0000002 16.9100136,14.1919403 17.6599998,14.1919403 C18.6800003,14.1919403 19,15.0000002 19,16.2881376 L19,21 L22,21 L22,15.9320968 C22,13.0000002 20.6800003,11.7600002 18.8546984,11.7600002 C17.1934107,11.7600002 16.4640957,12.6890529 16,13.321862 L16,11.9775198 L13,11.9775198 C13.0404109,12.8473238 13,21.2471997 13,21 L16,21 Z',
	'social-skype': 'M21.5366225,16.168778 C21.5319554,16.1932248 21.528844,16.2183383 21.5239547,16.242785 L21.5003969,16.1016605 C21.513287,16.1236626 21.5239547,16.1463314 21.5366225,16.168778 C21.6086294,15.7745182 21.646633,15.3709242 21.646633,14.9675525 C21.646633,14.0728006 21.4715052,13.2049402 21.1256945,12.3879735 C20.7918849,11.5990094 20.3142839,10.8902753 19.7055593,10.2817729 C19.0970569,9.67327047 18.3881005,9.19544719 17.5993587,8.86163762 C16.782392,8.51604915 15.9145315,8.34092136 15.0202241,8.34092136 C14.5984062,8.34092136 14.1765882,8.38070292 13.7652157,8.45959933 C13.7643268,8.45959933 13.7632155,8.45959933 13.7621043,8.46004381 C13.7852176,8.4722672 13.8085532,8.48315713 13.831222,8.495825 L13.6920977,8.47404515 C13.7154332,8.46937804 13.7387688,8.46493317 13.7621043,8.46004381 C13.1982729,8.16023748 12.5644347,8 11.9225958,8 C10.8749405,8 9.88951329,8.40803886 9.14855383,9.14922056 C8.40781662,9.89018002 8,10.875385 8,11.9234848 C8,12.5902149 8.17090517,13.2460552 8.49315808,13.8254437 C8.4973807,13.8012192 8.50026987,13.7769946 8.50471473,13.7532146 L8.52893926,13.8918945 C8.51627139,13.8701146 8.50538146,13.8474458 8.49315808,13.8254437 C8.42781852,14.2008128 8.39314855,14.5844049 8.39314855,14.9675525 C8.39314855,15.8618599 8.56872083,16.7297203 8.91453154,17.5469092 C9.24789663,18.33654 9.72594215,19.0448297 10.3342223,19.6531098 C10.9427247,20.2616122 11.6512366,20.73988 12.4406451,21.0728006 C13.2576118,21.419278 14.1256945,21.5944058 15.0202241,21.5944058 C15.4095946,21.5944058 15.8000762,21.5590691 16.1807791,21.4912849 C16.1585548,21.4788393 16.1356637,21.4677271 16.1132171,21.4546147 L16.2545639,21.479506 C16.2301172,21.4839509 16.2056704,21.4870623 16.1807791,21.4912849 C16.7677239,21.8233165 17.4320094,22 18.1105185,22 C19.1586183,22 20.1429342,21.5921834 20.8838937,20.8510017 C21.6250754,20.1104867 22.032892,19.1252818 22.032892,18.0774042 C22.032892,17.4080071 21.8606534,16.7501667 21.5366225,16.168778 Z M14.9633298,19.0550529 C12.6088834,19.0550529 11.5558942,17.8978315 11.5558942,17.0301934 C11.5558942,16.5850398 11.8843699,16.2734546 12.337302,16.2734546 C13.344509,16.2734546 13.0838175,17.7200368 14.9633298,17.7200368 C15.9254215,17.7200368 16.4570277,17.1977649 16.4570277,16.6626028 C16.4570277,16.3410166 16.2983459,15.9849827 15.6645077,15.8287456 L13.5707528,15.3058069 C11.8843699,14.8831 11.5783408,13.9714576 11.5783408,13.1144871 C11.5783408,11.3349843 13.2536115,10.6669207 14.8270946,10.6669207 C16.2761215,10.6669207 17.9845065,11.4676636 17.9845065,12.5353208 C17.9845065,12.99292 17.5882465,13.2587231 17.1359812,13.2587231 C16.2761215,13.2587231 16.4343588,12.0686097 14.7026383,12.0686097 C13.8430009,12.0686097 13.3667333,12.4577579 13.3667333,13.0146998 C13.3667333,13.5705305 14.0459091,13.7478808 14.6348541,13.8825602 L16.1850017,14.2263708 C17.882719,14.604629 18.3132044,15.5958345 18.3132044,16.529479 C18.3132044,17.9753945 17.203321,19.0550529 14.9633298,19.0550529 Z',
	'social-twitter': 'M22.3562992,12.6658465 C22.3562992,12.5250984 22.3562992,12.3843504 22.3499016,12.2436024 C22.9896654,11.7829724 23.5462598,11.2007874 23.9876969,10.5418307 C23.3991142,10.8041339 22.765748,10.9768701 22.1003937,11.0600394 C22.7785433,10.6569882 23.296752,10.0108268 23.5462598,9.24311024 C22.9128937,9.62057087 22.2091535,9.88927165 21.4606299,10.0364173 C20.859252,9.39665354 20.0083661,9 19.0679134,9 C17.2573819,9 15.7859252,10.4714567 15.7859252,12.2819882 C15.7859252,12.5378937 15.8179134,12.7874016 15.8690945,13.0305118 C13.1437008,12.8961614 10.7253937,11.5846457 9.10679134,9.60137795 C8.82529528,10.0875984 8.66535433,10.6505906 8.66535433,11.2519685 C8.66535433,12.390748 9.24753937,13.3951772 10.1240157,13.9837598 C9.58661417,13.9645669 9.08120079,13.8174213 8.63976378,13.574311 L8.63976378,13.6190945 C8.63976378,15.2057087 9.77214567,16.5364173 11.2691929,16.8371063 C10.9940945,16.913878 10.7062008,16.9522638 10.4055118,16.9522638 C10.1943898,16.9522638 9.98966535,16.9330709 9.79133858,16.894685 C10.207185,18.1998031 11.4227362,19.1466535 12.8558071,19.1722441 C11.7298228,20.0551181 10.3159449,20.5797244 8.78051181,20.5797244 C8.51820866,20.5797244 8.25590551,20.5669291 8,20.5349409 C9.44586614,21.4562008 11.1732283,22 13.0221457,22 C19.0551181,22 22.3562992,16.9970472 22.3562992,12.6658465 Z',
	'suggestion': 'M14,9L12 16 14 16 13 23 18 14 16 14 18 9z',
	'table': 'M8.92857143,8 C8.46428571,7.99999999 8,8.5064935 8.00928571,9.01298701 L8,19.987013 C8,20.4935065 8.46428571,21 8.92857143,21 L20.0714286,21 C20.5357143,21 21,20.4935065 21,19.987013 L21,9.01298704 C21,8.46428571 20.5357143,8 20.0714286,8 L8.92857143,8 Z M9,13 L12,13 L12,16 L9,16 L9,13 Z M9,17 L12,17 L12,20 L9,20 L9,17 Z M13,17 L16,17 L16,20 L13,20 L13,17 Z M13,13 L16,13 L16,16 L13,16 L13,13 Z M17,13 L20,13 L20,16 L17,16 L17,13 Z M17,17 L20,17 L20,20 L17,20 L17,17 Z',
	'tag': 'M9,10 L18,10 L18,20 L9,20 C8.5,20 8,19.5 8,19 L8,11 C8,10.5 8.5,10 9,10 Z M18,10 L22,15 L18,20 L18,10 Z',
	'template': 'M17,8 L20,8 C20.5,8 21,8.54545455 21,9.09090909 L21,20.9090909 C21,21.4545455 20.5,22 20,22 L10,22 C9.5,22 9,21.4545455 9,20.9090909 L9.01,9.09090909 C9,8.54545455 9.5,8 10,8 L13,8 C13,6.8954305 13.8954305,6 15,6 C16.1045695,6 17,6.8954305 17,8 Z M10,21 L10,9 L12,9 L12,11 L18,11 L18,9 L20,9 L20,21 L10,21 Z M15,9 C15.5522847,9 16,8.55228475 16,8 C16,7.44771525 15.5522847,7 15,7 C14.4477153,7 14,7.44771525 14,8 C14,8.55228475 14.4477153,9 15,9 Z',
	'text': 'M10,9 L20,9 C20.5,9 21,9.5 21,10 C21,10 21,20 21,20 C21,20.5 20.5,21 20,21 L10,21 C9.5,21 9,20.5 9,20 C9,18.7231722 9,10 9,10 C9,9.5 9.5,9 10,9 Z M11,14 L19,14 L19,15 L11,15 L11,14 Z M11,16 L19,16 L19,17 L11,17 L11,16 Z M11,18 L15,18 L15,19 L11,19 L11,18 Z',
	'text-block': 'M10,9 L20,9 L20,11 L10,11 L10,9 Z M14,11 L16,11 L16,20 L14,20 L14,11 Z',
	'theme': 'M8,15 C8,18.8655556 11.1344444,22 15,22 C15,22 16,22 16,21 C16,20 15,20.0477781 15,19 C15,18 16,18 18,18 C21,18 22,16 22,14.2222222 C22,10.5 19,8 15,8 C11,8 8,11.1344444 8,15 Z M19,15 C19.5522847,15 20,14.5522847 20,14 C20,13.4477153 19.5522847,13 19,13 C18.4477153,13 18,13.4477153 18,14 C18,14.5522847 18.4477153,15 19,15 Z M17,12 C17.5522847,12 18,11.5522847 18,11 C18,10.4477153 17.5522847,10 17,10 C16.4477153,10 16,10.4477153 16,11 C16,11.5522847 16.4477153,12 17,12 Z M13,12 C13.5522847,12 14,11.5522847 14,11 C14,10.4477153 13.5522847,10 13,10 C12.4477153,10 12,10.4477153 12,11 C12,11.5522847 12.4477153,12 13,12 Z M11,15 C11.5522847,15 12,14.5522847 12,14 C12,13.4477153 11.5522847,13 11,13 C10.4477153,13 10,13.4477153 10,14 C10,14.5522847 10.4477153,15 11,15 Z',
	'trash': 'M9,8 L12,8 L13,7 L16,7 L17,8 L20,8 L20,10 L9,10 L9,8 Z M10,11 L10,20.4545455 C10,20.7272727 10.3461538,21 10.6923077,21 L18.3076923,21 C18.6538461,21 19,20.7272727 19,20.4545455 L19,11 L10,11 Z M12,13 L13,13 L13,19 L12,19 L12,13 Z M14,13 L15,13 L15,19 L14,19 L14,13 Z M16,13 L17,13 L17,19 L16,19 L16,13 Z',
	'url': 'M19,18.7749381 C19.9299234,17.7899271 20.5,16.4615378 20.5,15 C20.5,12.3039304 18.560118,10.0609444 16,9.59068811 L16,10 C16,11.5 15,12 13.9509277,12 L13,12 C13,12.5 12.5,13 12,13 L11,13 L11,14 L15,14 C15.5,14 16,14.5 16,15 L16,17 L18,17 C18.5,17 19,17.5 19,18 L19,18.7749381 Z M9.5370653,14.3580435 C9.51258495,14.5686299 9.5,14.7828453 9.5,15 C9.5,17.6960696 11.439882,19.9390556 14,20.4093119 L14,19 C13.0238037,19 12,18 12,17 L12,16 L9.5370653,14.3580435 Z M8,15 C8,11.1266667 11.1266667,8 15,8 C18.8733333,8 22,11.1266667 22,15 C22,18.8733333 18.8733333,22 15,22 C11.1266667,22 8,18.8733333 8,15 Z',
	'underline': 'M10,21 L20,21 L20,22 L10,22 L10,21 Z M11,9 L13,9 L13,15 C13,16 13.5,17 15,17 C16.5,17 17,16 17,15 L17,9 L19,9 L19,15 C19,17 17.5,19 15,19 C12.5,19 11,17 11,15 L11,9 Z',
	'unlock': 'M19,10 C19,7.790861 17.209139,6 15,6 C12.790861,6 11,7.790861 11,10 C11,10 19,10 19,10 Z M17.5,10 C17.5,8.61928813 16.3807119,7.5 15,7.5 C13.6192881,7.5 12.5,8.61928813 12.5,10 L17.5,10 Z M11,10 L12.5,10 L12.5,13 L11,13 L11,10 Z M10,13 L20,13 C20.5,13 21,13.5 21,14 C21,14 21,22 21,22 C21,22.5 20.5,23 20,23 L10,23 C9.5,23 9,22.5 9,22 C9,20.7231722 9,14 9,14 C9,13.5 9.5,13 10,13 Z M15,19 C15.5522847,19 16,18.5522847 16,18 C16,17.4477153 15.5522847,17 15,17 C14.4477153,17 14,17.4477153 14,18 C14,18.5522847 14.4477153,19 15,19 Z',
	'up': 'M14,12 L11,15 L9.5,13.5 L15,8 L20.5,13.5 L19,15 L16,12 L16,21 L14,21 L14,12 Z',
	'view': 'M15,21 C21.3137085,21 24,15 24,15 C24,15 21.3137085,9 15,9 C8.6862915,9 6,15 6,15 C6,15 8.6862915,21 15,21 Z M15,19 C17.209139,19 19,17.209139 19,15 C19,12.790861 17.209139,11 15,11 C12.790861,11 11,12.790861 11,15 C11,17.209139 12.790861,19 15,19 Z M15,17 C16.1045695,17 17,16.1045695 17,15 C17,13.8954305 16.1045695,13 15,13 C13.8954305,13 13,13.8954305 13,15 C13,16.1045695 13.8954305,17 15,17 Z',
	'zip': 'M10,9 L20,9 C20.5,9 21,9.5 21,10 C21,10 21,20 21,20 C21,20.5 20.5,21 20,21 L10,21 C9.5,21 9,20.5 9,20 C9,18.7231722 9,10 9,10 C9,9.5 9.5,9 10,9 Z M15,9 L16,9 L16,10 L15,10 L15,9 Z M14,10 L15,10 L15,11 L14,11 L14,10 Z M15,11 L16,11 L16,12 L15,12 L15,11 Z M14,12 L15,12 L15,13 L14,13 L14,12 Z M15,13 L16,13 L16,14 L15,14 L15,13 Z'
};

module.exports = iconData;