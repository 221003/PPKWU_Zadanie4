const { default: axios } = require("axios");
const bodyParser = require("body-parser");
var express = require("express");
var app = express();

const formatArray = ["xml", "text", "json", "csv"];

const validFormat = (req, res, next) => {
    const { requestFormat, responseFormat } = req.params;

    if(!formatArray.some(f => f == requestFormat)) {
        res.status = 400;
        res.send(formatResponse("json", { status: "error", data: null }));
    }

    if(!formatArray.some(f => f == responseFormat)) {
        res.status = 400;
        res.send(formatResponse("json", { status: "error", data: null }));
    }

    next();
}

const getSubstringBetweenTwoString = (start, end, str) => {
    return str.substring(
        str.indexOf(start) + start.length, 
        str.lastIndexOf(end)
    );
}

const getDataFromResponse = (response) => {
    var status = null;
    var result = null;

    if(typeof response == "object") {
        status = response.status;
        result = response.result;
    }
    
    if(typeof response == "string") {
        response = response.replace(/\s/g, "")

        if(response.startsWith(`<ApiResponse>`)) {
            status = getSubstringBetweenTwoString("<Status>", "</Status>", response);
            result = getSubstringBetweenTwoString("<Result>", "</Result>", response);
        }

        if(response.startsWith(`status_`)) {
            status = getSubstringBetweenTwoString("status_", "|", response);
            result = getSubstringBetweenTwoString("result_", "", response);
        }

        if(response.startsWith(`"status","result"`)) {
            resArr = response.split(`""`);
            dataArr = resArr[1].split(`,`);
            
            status = dataArr[0].replace(/\"/g, '');
            result = dataArr[1].replace(/\"/g, '');
        }
    }

    return {
        status: status,
        data: result,
    }
}

const formatResponse = (format, response) => {
    switch (format) {
        case "xml":
            return `
            <ApiResponse>
                <Status>${response.status}</Status>
                <Result>${response.data}</Result>
            </ApiResponse>
            `;

        case "json":
            return {
                status: response.status,
                result: response.data
            };
    
        case "text":
            return `status_${response.status}|result_${response.data}`;

        case "csv":
            return `"status","result"\r\n"${response.status}","${response.data}"\r\n`;
    }
}

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/api/:requestFormat/to/:responseFormat/string/:text/length", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/length`)

    const data = getDataFromResponse(response.data);

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/contain/uppercase", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/contain/uppercase`)

    const data = getDataFromResponse(response.data);

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/contain/lowercase", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/contain/lowercase`)

    const data = getDataFromResponse(response.data);

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/contain/specialchar", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/contain/specialchar`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/contain/whitespace", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/contain/whitespace`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/validate/number", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/validate/number`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/validate/number", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/validate/number`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/count/uppercase", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/count/uppercase`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})


app.get("/api/:requestFormat/to/:responseFormat/string/:text/count/lowercase", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/count/lowercase`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})


app.get("/api/:requestFormat/to/:responseFormat/string/:text/count/specialchar", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/count/specialchar`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/count/whitespace", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/count/whitespace`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})

app.get("/api/:requestFormat/to/:responseFormat/string/:text/count", validFormat, async (req, res) => {
    const { text, requestFormat, responseFormat } = req.params;

    let response = await axios.get(`http://localhost:8080/api/${requestFormat}/string/${text}/count/whitespace`)

    const data = getDataFromResponse(response.data);
    

    res.status = 200;
    res.send(formatResponse(responseFormat, data))
})


app.post("/api/change-format/to/:format", async (req, res) => {
    const { format } = req.params;
    let request = req.body;

    if(!formatArray.some(f => f == format)) {
        res.status = 400;
        res.send(formatResponse("json", { status: "error", data: null }));
    }

    if(request.startsWith("{")) {
        request = JSON.parse(request);
    }

    const data = getDataFromResponse(request);

    res.status = 200;
    res.send(formatResponse(format, data))
})

app.listen(8000, () => {
 console.log("Server running");
});