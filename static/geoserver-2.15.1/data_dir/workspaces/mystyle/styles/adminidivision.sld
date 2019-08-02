<?xml version="1.0" encoding="gb2312"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
    <sld:UserLayer>
        <sld:LayerFeatureConstraints>
            <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
            <sld:Name>行政区划</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>group 0</sld:Name>
                <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
                <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>
                <sld:SemanticTypeIdentifier>simple</sld:SemanticTypeIdentifier>
                <sld:Rule>
                   		 <sld:Name>sheng1</sld:Name>
                       <sld:Title>省[1]</sld:Title>
                   		 <ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>grade</ogc:PropertyName>
                   		         <ogc:Literal>1</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#A5DD6E</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.01</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#000000</sld:CssParameter>
                               <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                   		 <sld:Name>shiqu2</sld:Name>
                       <sld:Title>市区[2]</sld:Title>
                   		 <ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>grade</ogc:PropertyName>
                   		         <ogc:Literal>2</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#A5DD6E</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#000000</sld:CssParameter>
                               <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                   		
                 </sld:Rule>
 						 <sld:Rule>
                   		 <sld:Name>xian3</sld:Name>
                       <sld:Title>县[3]</sld:Title>
                   		 <ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>grade</ogc:PropertyName>
                   		         <ogc:Literal>3</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#A5DD6E</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#000000</sld:CssParameter>
                               <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                   		
                 </sld:Rule>
                 <sld:Rule>
                   		 <sld:Name>jiedao4</sld:Name>
                       <sld:Title>街道、乡镇[4]</sld:Title>
                   		 <ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>grade</ogc:PropertyName>
                   		         <ogc:Literal>4</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#A5DD6E</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#000000</sld:CssParameter>
                               <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                   		
                </sld:Rule>
 						<sld:Rule>
                   		 <sld:Name>chun5</sld:Name>
                       <sld:Title>村.社区[5]</sld:Title>
                   		 <ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>grade</ogc:PropertyName>
                   		         <ogc:Literal>5</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#A5DD6E</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#000000</sld:CssParameter>
                               <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                   		
                </sld:Rule>



				  
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:UserLayer>
</sld:StyledLayerDescriptor>