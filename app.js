const DataMap = require("datamaps");
d3.csv(
    "E-E-DATA-for-DOWNLOAD-7-27-2015.csv",
    function (d) {
        return { State: d.state, Percent: d.Percent };
    },
    function (data) {
        const map = new DataMap({
            scope: "usa",
            element: document.getElementById("map"),
            responsive: true,
            geographyConfig: {
                highlightOnHover: false,
                popupTemplate: function (geo) {
                    function findState(states) {
                        return states.State === geo.id;
                    }
                    return [
                        '<div class="hoverinfo"><strong>',
                        gep.properties.name,
                        ":$" + data.find(findState).Percent,
                        "</strong></div>",
                    ].join("");
                },
            },
        });
        const over10 = "green",
            over5 = "yellow",
            under5 = "red";

        for (let i = 0; i < data.length; i++) {
            let st = d3.select("." + data[i].State);

            if (data[i].Percent > 10) {
                st.style("fill", over10);
            } else if (data[i].Percent > 5) {
                st.style("fill", over5);
            } else {
                st.style("fill", under5);
            }
        }

        d3.select(window).on("resize", function () {
            map.resize();
        });
    }
);
