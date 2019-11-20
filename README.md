# functionality
this code is part of a program to learn vocabulary words from Dutch language. The user inputs new words into an excel file with the corresponding translation (in the user's mother language) in the column next to it. When running the script for the first time the system creates a test with 10 words randomly picked from the vocabulary list. As the user submits the corresponding answers, the system saves them and based on the success/fail stats provides a more customized test on each iteration.

# running the code
The code is located in the src folder and the spreadsheet containing the data is in data > raw folder.
This code is intended to be read (not executed) with the purpose of evaluating the quality of it based on the concepts explained today. The code is a replica of a script written in JS linked to an online spreadsheet with its own workframe, therefore, it won't work on its own.  

# test

Version 0.1.0

sgenerates a test picking a set of items from a dataset


## Project organization

```
.
├── .gitignore
├── CITATION.md
├── LICENSE.md
├── README.md
├── requirements.txt
├── bin                <- Compiled and external code, ignored by git (PG)
│   └── external       <- Any external source code, ignored by git (RO)
├── config             <- Configuration files (HW)
├── data               <- All project data, ignored by git
│   ├── processed      <- The final, canonical data sets for modeling. (PG)
│   ├── raw            <- The original, immutable data dump. (RO)
│   └── temp           <- Intermediate data that has been transformed. (PG)
├── docs               <- Documentation notebook for users (HW)
│   ├── manuscript     <- Manuscript source, e.g., LaTeX, Markdown, etc. (HW)
│   └── reports        <- Other project reports and notebooks (e.g. Jupyter, .Rmd) (HW)
├── results
│   ├── figures        <- Figures for the manuscript or reports (PG)
│   └── output         <- Other output for the manuscript or reports (PG)
└── src                <- Source code for this project (HW)

```


## License

This project is licensed under the terms of the [MIT License](/LICENSE.md)

## Citation

Please [cite this project as described here](/CITATION.md).
