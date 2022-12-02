import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "IBRD Subscriptions and Voting Powers",
    subcaption: "For OECD countries",
    showvalues: "0",
    labeldisplay: "ROTATE",
    rotatelabels: "1",
    plothighlighteffect: "fadeout",
    plottooltext: "$seriesName in $label : <b>$dataValue</b>",
    theme: "fusion"
  },
  axis: [
    {
      title: "Subscription Amount",
      titlepos: "left",
      numberprefix: "$",
      divlineisdashed: "1",
      maxvalue: "100000",
      dataset: [
        {
          seriesname: "Subscription Amount",
          linethickness: "3",
          data: [
            {
              value: "38450.2"
            },
            {
              value: "16544.4"
            },
            {
              value: "10659.4"
            },
            {
              value: "9657.4"
            },
            {
              value: "9040.4"
            },
            {
              value: "9040.4"
            },
            {
              value: "6992.3"
            },
            {
              value: "6650.5"
            },
            {
              value: "6650.5"
            },
            {
              value: "6337.2"
            },
            {
              value: "5835.4"
            },
            {
              value: "4582.9"
            }
          ]
        }
      ]
    },
    {
      title: "Subscription %",
      axisonleft: "1",
      titlepos: "left",
      numdivlines: "8",
      divlineisdashed: "1",
      maxvalue: "25",
      numbersuffix: "%",
      dataset: [
        {
          seriesname: "Subscription %",
          dashed: "1",
          data: [
            {
              value: "17.23"
            },
            {
              value: "7.41"
            },
            {
              value: "4.78"
            },
            {
              value: "4.33"
            },
            {
              value: "4.05"
            },
            {
              value: "4.05"
            },
            {
              value: "3.13"
            },
            {
              value: "2.98"
            },
            {
              value: "2.98"
            },
            {
              value: "2.84"
            },
            {
              value: "2.62"
            },
            {
              value: "2.05"
            }
          ]
        }
      ]
    },
    {
      title: "Number of Votes",
      titlepos: "RIGHT",
      axisonleft: "0",
      numdivlines: "5",
      numbersuffix: "",
      divlineisdashed: "1",
      maxvalue: "400000",
      dataset: [
        {
          seriesname: "Number of Votes",
          linethickness: "3",
          data: [
            {
              value: "358196"
            },
            {
              value: "166138"
            },
            {
              value: "107288"
            },
            {
              value: "97268"
            },
            {
              value: "91098"
            },
            {
              value: "91098"
            },
            {
              value: "70617"
            },
            {
              value: "67199"
            },
            {
              value: "67199"
            },
            {
              value: "64066"
            },
            {
              value: "59048"
            },
            {
              value: "46523"
            }
          ]
        }
      ]
    },
    {
      title: "Voting %",
      titlepos: "RIGHT",
      axisonleft: "0",
      numdivlines: "5",
      divlineisdashed: "1",
      maxvalue: "20",
      numbersuffix: "%",
      dataset: [
        {
          seriesname: "Voting %",
          dashed: "1",
          data: [
            {
              value: "16.3"
            },
            {
              value: "7.03"
            },
            {
              value: "4.54"
            },
            {
              value: "4.12"
            },
            {
              value: "3.86"
            },
            {
              value: "3.86"
            },
            {
              value: "2.99"
            },
            {
              value: "2.84"
            },
            {
              value: "2.84"
            },
            {
              value: "2.71"
            },
            {
              value: "2.5"
            },
            {
              value: "1.97"
            }
          ]
        }
      ]
    }
  ],
  categories: [
    {
      category: [
        {
          label: "2006"
        },
        {
          label: "2007"
        },
        {
          label: "2008"
        },
        {
          label: "2009"
        },
        {
          label: "2010"
        },
        {
          label: "2011"
        },
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        }
      ]
    }
  ]
};

class MyComponent extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="multiaxisline"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}
