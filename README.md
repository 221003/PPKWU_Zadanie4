## PPKWU - Programowanie pod kątem wielokrotnego użycia

## Zadanie 4

API przyjmuje ciąg znaków, format pobieranej odpowiedzi oraz format zwracanej odwpowiedzi następnie analizuje podany string pod kątem podanych warunków.

## Format odpowiedzi

### JSON

```
{
  status: "success" | "error",
  result: "Wynik działania wywołanej metody"
}
```

### TEXT

```
status_("success" | "error")|result_(Wynik działania wywołanej metody)
```

### XML

```
<ApiResponse>
	<Status>("success" | "error")</Status>
	<Result>(Wynik działania wywołanej metody)</Result>
</ApiResponse>
```

### CSV

```
"status","result"
"("success" | "error")","(Wynik działania wywołanej metody)"
```


## URL-encoded

Parametr `:text` przekazywany do metod API, dla niektórych znaków musi zostać wysłany w formacie URL-encoded.

## Dostępne foramty danych

Paramety `:requestFromat`, `:responseFormat` i `:format` mogą przyjmować wartości `json`, `text`, `xml`, `csv`

## Dostępne metody

|Metoda| Ścieżka                                               |Parametr        |Odpowiedź| Opis                                                          |
|------|-------------------------------------------------------|----------------|---------|---------------------------------------------------------------|
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/length                      | :requestFormat<br>:responseFormat :text  | boolean | Zwraca długość ciągu znaków                                   |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/contain/uppercase           | :requestFormat<br>:responseFormat<br>:text  | boolean | Zwraca `true` jeżeli<br> ciąg znaków zawiera wielką literę    |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/contain/lowercase           | :requestFormat<br>:responseFormat<br>:text  | boolean | Zwraca `true` jeżeli<br> ciąg znaków zawiera małą literę      |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/contain/specialchar         | :requestFormat<br>:responseFormat<br>:text  | boolean | Zwraca `true` jeżeli<br> ciąg znaków zawiera znak specjalny   |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/contain/whitespace          | :requestFormat<br>:responseFormat<br>:text  | boolean | Zwraca `true` jeżeli<br> ciąg znaków zawiera biały znak       |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/validate/number             | :requestFormat<br>:responseFormat<br>:text  | boolean | Zwraca "true" jeżeli<br> ciąg znaków jest liczbą              |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/count/uppercase             | :requestFormat<br>:responseFormat<br>:text  | number  | Zlicza liczbę wystąpień<br> wielkiej litery w ciągu znaków    |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/count/lowercase             | :requestFormat<br>:responseFormat<br>:text  | number  | Zlicza liczbę wystąpień<br> małej litery w ciągu znaków       |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/count/specialchar           | :requestFormat<br>:responseFormat<br>:text  | number  | Zlicza liczbę wystąpień<br> znaków specjalnych w ciągu znaków |
| GET  | /api/:requestFormat/to/:responseFormat/string/:text/count/whitespace            | :requestFormat<br>:responseFormat<br>:text  | number  | Zlicza liczbę wystąpień<br> białych znaków w ciągu znaków     |
| POST  | /api/change-format/to/:format                                                  | :format<br>body  | json, xml, csv, text  | Zmienia format danych przekazanych w body rządania<br> na podany w parametrze `:format`     |



## Przykładowe wywołania metod

* GET /api/:requestFormat/to/:responseFormat/string/:text/length
```
http://localhost:8000/api/xml/to/json/string/abc/length

Parametr: requestFormat = "xml", responseFormat = "json", text = "abc"
Odpowiedz:
{
    "status": "success",
    "result": 3
}

```

* GET /api/:requestFormat/to/:responseFormat/string/:text/contain/uppercase
```
http://localhost:8000/api/xml/to/text/string/aBc/contain/uppercase

Parametr: requestFormat = "xml", responseFormat = "text", text = "aBc"
Odpowiedz:
status_success|result_true

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/contain/lowercase
```
http://localhost:8000/api/xml/to/xml/string/aBc/contain/lowercase

Parametr: requestFormat = "xml", responseFormat = "xml", text = "aBc"
Odpowiedz:
<ApiResponse>
	<Status>success</Status>
	<Result>true</Result>
</ApiResponse>

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/contain/specialchar
```
http://localhost:8000/api/xml/to/csv/string/aB$c/contain/specialchar

Parametr: requestFormat = "xml", responseFormat = "csv", text = "aB$c"
Odpowiedz:
"status","result"
"success","1"

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/contain/whitespace
```
http://localhost:8000/api/xml/to/text/string/aB $c/contain/whitespace

Parametr: requestFormat = "xml", responseFormat = "text", text = "aB $c"
Odpowiedz:
status_success|result_true

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/validate/number
```
http://localhost:8000/api/xml/to/xml/string/123/validate/number

Parametr: requestFormat = "xml", responseFormat = "xml", text = "123"
<ApiResponse>
	<Status>success</Status>
	<Result>true</Result>
</ApiResponse>

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/count/uppercase
```
http://localhost:8000/api/xml/to/csv/string/aBc/count/uppercase

Parametr: requestFormat = "xml", responseFormat = "csv", text = "aBc"
Odpowiedz:
"status","result"
"success","1"

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/count/lowercase
```
http://localhost:8000/api/xml/to/text/string/aBc/count/lowercase

Parametr: requestFormat = "xml", responseFormat = "text", text = "aBc"
Odpowiedz:
status_success|result_2

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/count/specialchar
```
http://localhost:8000/api/xml/to/xml/string/{as!>/count/specialchar

Parametr: requestFormat = "xml", responseFormat = "xml", text = "{as!>"
<ApiResponse>
	<Status>success</Status>
	<Result>3</Result>
</ApiResponse>

```


* GET /api/:requestFormat/to/:responseFormat/string/:text/count/whitespace
```
http://localhost:8000/api/xml/to/json/string/a b c/count/whitespace

Parametr: requestFormat = "xml", responseFormat = "json", text = "a b c"
Odpowiedz:
{
    "status": "success",
    "result": 2
}

```

* POST /api/change-format/to/:format
```
http://localhost:8000//api/change-format/to/json

Parametr: format = "json"
Body:
<ApiResponse>
	<Status>success</Status>
	<Result>2</Result>
</ApiResponse>

Odpowiedz:
{
    "status": "success",
    "result": 2
}

```
