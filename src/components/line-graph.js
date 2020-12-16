import { ResponsiveLine } from '@nivo/line';

import './line-graph.scss';

const LineGraph = ({ data = []}) => (
    <ResponsiveLine
        colors={config => config.color}
        data={data}
        margin={{ top: 50, right: 100, bottom: 150, left: 100 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 0, max: 11, stacked: false, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 10,
            tickRotation: -50,
            legend: '',
            legendOffset: 75,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'rating',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 100,
                itemsSpacing: 20,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default LineGraph;