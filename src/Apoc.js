import React, { useState } from 'react';
import Values from 'values.js'
import { useQueryState } from 'use-location-state'

function luminance(rgb) {
	const [r,g,b] = rgb;
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function score( l1, l2 ) {
	const a = ( l1 + 0.05) / ( l2 + 0.05 );
	const b = ( l2 + 0.05) / ( l1 + 0.05 );

	if ( a > b ){
		return a;
	} else {
		return b;
	}
}

function grade( score ){
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


const Apoc = () => {
  const [ value, setValue ] = useState( '' ); 
  const [ error, setError ] = useState( '' ); 
  const [ colors, setColors] = useQueryState('colors', []);

  const handleChange = (event) => {
	setValue( event.target.value );
  }

  const handleSubmit = (event) =>  {
	let c = event.target[0].value;
	if ( c.length === 3 || c.length === 6 ){
		c = '#' + c;
	}
	try{
		new Values( c );
		setColors( colors.includes ( c ) ? colors.filter( t => t !== c) : [...colors, c ] ); 
		setValue('');
		setError('' );
	} catch ( e ){
		console.log( e );
		setError( 'Invalid Color String' );
	}
	event.preventDefault();
  }
	
    return (
	  <div>
      <form className="form" onSubmit={handleSubmit}>
        <label for="input">
          Color:
        </label>
        <input name="input" placeholder="hex, HSL/A, or RGB/A" type="text" value={value} onChange={handleChange} ></input>
        <input type="submit" value="Submit" ></input>
		<p>{error}</p>
      </form>
	  <table>
		<thead>
			<tr>
				<th></th>
				{colors.map( c => {
					return <th key={ "th +" +  c} >{c} <span style={{  height: '10px' , width: '10px', border:'1px solid black', display: 'inline-block',  background: c  }}  >&nbsp;</span> </th>
				})}
			</tr>
		</thead>
		<tbody>	
			{colors.map( c1 => {
				const color1 = new Values( c1 );
				const lum1 = luminance( color1.rgb );
				return <tr key={c1} ><td>{c1}</td>{colors.map( c2 => {
					if ( c1 === c2 ){
						return <td key={c1 + c2}>&nbsp;</td>
					}
					const color2 = new Values( c2 );

					const lum2 = luminance( color2.rgb );

					const ratio = score( lum1, lum2 );
					const rating = grade( ratio );
					
					return <td key={c1 + c2}> {  rating === 'fail' ? <span> Fail <span style={{ padding: '2px', border:'1px solid black', display: 'inline-block',  background: c1, color: c2   }}>X</span></span> : <span style={{ padding: '2px', display: 'inline-block',  background: c1, color: c2   }}>{rating}</span> } </td>
				})}</tr>
			})}
		</tbody>
	  </table>

	  </div>
    );
}

export default Apoc;
