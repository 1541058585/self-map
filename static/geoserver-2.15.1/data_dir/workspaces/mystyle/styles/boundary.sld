<?xml version="1.0" encoding="GB2312"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
    <sld:UserLayer>
        <sld:LayerFeatureConstraints>
            <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
            <sld:Name>BOUNDARY PDC</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>group 0</sld:Name>
                <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
                <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>
                <sld:SemanticTypeIdentifier>colorbrewer:unique:accents</sld:SemanticTypeIdentifier>
                <sld:Rule>
                    <sld:Name>rule01</sld:Name>
                    <sld:Title>1</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
		<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#C0C0C0</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule011</sld:Name>
                    <sld:Title>11</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>1</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
		<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#C0C0C0</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.2</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule02</sld:Name>
                    <sld:Title>2</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#8ACEF2</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
<sld:Rule>
                    <sld:Name>rule02</sld:Name>
                    <sld:Title>2</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>2</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#8ACEF2</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule03</sld:Name>
                    <sld:Title>3</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFDD97</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
<sld:Rule>
                    <sld:Name>rule03</sld:Name>
                    <sld:Title>3</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFDD97</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule04</sld:Name>
                    <sld:Title>4</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>4</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FACFE1</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule04</sld:Name>
                    <sld:Title>4</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>4</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FACFE1</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule010</sld:Name>
                    <sld:Title>10</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>5</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#A7D6AF</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
<sld:Rule>
                    <sld:Name>rule010</sld:Name>
                    <sld:Title>10</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>5</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#A7D6AF</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule06</sld:Name>
                    <sld:Title>6</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>6</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#CEBDDD</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule07</sld:Name>
                    <sld:Title>7</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>7</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFA9D</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule08</sld:Name>
                    <sld:Title>8</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>8</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>4000000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#F9B8A2</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
<sld:Rule>
                    <sld:Name>rule06</sld:Name>
                    <sld:Title>6</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>6</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#CEBDDD</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule07</sld:Name>
                    <sld:Title>7</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>7</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFA9D</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule08</sld:Name>
                    <sld:Title>8</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>8</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
<sld:MinScaleDenominator>1000000.0</sld:MinScaleDenominator>
		<sld:MaxScaleDenominator>4000000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#F9B8A2</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke/>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:UserLayer>
</sld:StyledLayerDescriptor>