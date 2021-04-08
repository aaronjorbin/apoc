const luminance = (rgb) => {
	const [r,g,b] = rgb;
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const  score = ( l1, l2 ) => {
	const a = ( l1 + 0.05) / ( l2 + 0.05 );
	const b = ( l2 + 0.05) / ( l1 + 0.05 );

	if ( a > b ){
		return a;
	} else {
		return b;
	}
}

const grade = ( score ) => {
	if ( score < 3 ){
		return 'fail';
	} else if ( score < 4.5 ) {
		return 'aa-large'
	} else if ( score < 7 ){
		return 'aa';
	} else { 
		return 'aaa';
	}
}

export { luminance, score, grade }
