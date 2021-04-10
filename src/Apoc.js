import React, { useState } from 'react';
import Values from 'values.js'
import { useQueryState } from 'use-location-state'
import { luminance, score, grade, borw, borwText } from './utils'

const Apoc = () => {
  const [ value, setValue ] = useState( '' ); 
  const [ error, setError ] = useState( '' ); 
  const [ colors, setColors] = useQueryState('colors', []);

  const handleChange = (event) => {
	setValue( event.target.value );
  }

  const remove = ( c ) => {
	setColors( colors.filter( t => t !== c ) );
  }

  const clear = () => {
	setColors([]);
  }

  const handleSubmit = (event) =>  {
	let c = event.target[0].value;
	if ( c.length === 3 || c.length === 6 ){
		c = '#' + c;
	}
	try{
		new Values( c );
		if ( colors.includes ( c ) ) {
			setError( c + ' is already in the matrix' );
		} else {
			setColors( [...colors, c ] ); 
			setValue('');
			setError('' );
		}
	} catch ( e ){
		console.log( e );
		setError( 'invalid color string' );
	}
	event.preventDefault();
  }
	
    return (
	  <div>
      <form className="flex align-center max-w-sm justify-between content-between mx-auto mb-2 self-center items-center" onSubmit={handleSubmit}>
        <label htmlFor="input">
          Color:
			<input className="ml-2" name="input" placeholder="hex, HSL/A, or RGB/A" type="text" value={value} onChange={handleChange} ></input>
        </label>
        <input type="submit" value="Submit" ></input>
		<p>{error}</p>
      </form>
	  <table className="table-auto border-collapse mx-auto" >
		<thead>
			<tr>
				<th className=" bg-black"></th>
				{colors.map( c => {
					const color = new Values( c );
					const lum = luminance( color.rgb );
					const classes = borw( lum ) ;  

					return <th key={ "th +" +  c} className={classes} > 
						<span style={{ color:c }}>
						{c}
						</span>
						<button className="ml-2 text-xs" onClick={ e => remove( c ) }>X</button>  
					</th>
				})}
			</tr>
		</thead>
		<tbody>	
			{colors.map( c1 => {
				const color1 = new Values( c1 );
				const lum1 = luminance( color1.rgb );
				const classes = borwText( lum1 );  
				return <tr key={c1} ><td className={classes} style={{ backgroundColor: c1 }} >{c1}</td>{colors.map( c2 => {
					if ( c1 === c2 ){
						return <td className="border-2 border-black border-solid" key={c1 + c2}>&nbsp;</td>
					}
					const color2 = new Values( c2 );

					const lum2 = luminance( color2.rgb );

					const ratio = score( lum1, lum2 );
					const rating = grade( ratio );
					
					return <td className="border-2 border-black border-solid text-center" key={c1 + c2}> {  rating === 'fail' ? <span> Fail <span style={{ padding: '2px', border:'1px solid black', display: 'inline-block',  background: c1, color: c2   }}>X</span></span> : <span style={{ padding: '2px', display: 'inline-block',  background: c1, color: c2   }}>{rating}</span> } </td>
				})}</tr>
			})}
		</tbody>
	  </table>

	  { colors.length > 0 && <button className="my-2" onClick={clear}>Reset Colors</button> }

	  <div>
		  <p>Apoc is designed to help you understand how your entire color palate interacts with each other. It aims to make it easier for you to know which combinations will work together in a way that can be read by people with some uncorrected visual deficiency.</p>
		  <p>Apoc is based on the standards outlined in the Web Content Accessibility Guidelines version 2.1, specifically <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html">criteria 1.4.3</a>. The ratings shown for each color pair corresponds to the ratios set out in the WCAG standards. The ratio is the between the relative luminance of the colors, calculated using the <a href="https://www.sis.se/api/document/preview/562720/">international standard from IEC</a>.</p>
		  <p>The results show AAA when the ratio is greater than 7:1. This is considered high contrast and viewers with the equivalent of 20/80 vision should be able to read this text. AA means a ratio of 4.5:1, which should allow someone with 20/40 vision to read the text. AA-Large means a ratio of 3:1 which when combined with text that is at least 18 point or 14 point bold, should allow someone with 20/40 vision to read the text. Fail is shown when the ratio doesn't meet the minimum ratio. You should avoid combining colors that fail.</p> 
		  <p>This contrast calculator doesn't take into account any sort of color deficiency. It's important to still not use color as the only distinguishing factor. Having an accessible color palette is one step to help your visitors perceive your content.</p> 
	  </div>

	  </div>
    );
}

export default Apoc;
