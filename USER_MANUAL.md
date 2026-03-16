<div align="center"><img width="1150" height="630" alt="image" src="https://github.com/user-attachments/assets/7a713393-9f00-4324-909c-1b89bc62218f" />
</div>


# Machbarkeitsapp - Frontend
Machbarkeitsapp is a web application designed to assess the feasibility of clinical research questions. Users can construct feasibility queries by defining inclusion criteria based on clinical data (Merkmale) and applying filters to restrict the query scope. The system then estimates the number of patients matching the defined criteria.

## Core Features
Machbarkeitsapp provides an interactive query builder with the following capabilities:

#### Query Builder & Logic
* Build feasibility queries using clinical criteria (Merkmale).
* Combine criteria using logical operators (**AND / OR**).
* Reorder criteria via drag-and-drop interactions.

#### Filtering & Refinement
<img width="380" height="300" alt="image" src="https://github.com/user-attachments/assets/6eafe57c-9ab2-416d-9a48-6698fb4ec65b" />

* Apply global or local time ranges and other restrictions to filter query results.
* Display warnings for invalid or incomplete filter criteria.
* Global Filter Conflict Dialog: 
	* When applying a global filter, the system checks whether some criteria currently use local filters.
	* If this is the case, a dialog will appear asking how the new global filter should be applied.
  	* The user can choose between the following options:
		* **ABBRECHEN:** Cancels the operation. No filters will be changed.
  		* **Nur globale Filter aktualisiren:** The new global filter will only update criteria that currently use the global filter. Criteria with local filters will remain unchanged.
		* **Alle Filter ersetzen:** The new global filter will replace all existing filters, including local filters. All criteria will then use the same global filter.

**Update Global Filters Only**  
The new global filter will only update criteria that currently use the global filter.  
Criteria with local filters will remain unchanged.

**Replace All Filters**  
The new global filter will replace all existing filters, including local filters.  
All criteria will then use the same global filter.

#### Visual Representation
* Each criterion element is visually highlighted using the color of its corresponding module, allowing users to easily distinguish criteria belonging to different clinical modules.

#### Query Management & Execution
* **Save/Upload:** Persistence of complex queries.<br>
* **Reset:** Quickly clear the current workspace.<br>
* **Start Query:** Execute queries to receive aggregated patient counts from the backend.

## Data Import & JSON Schema
#### Example Query JSON

```python
{
  "version": "1.0.0",
  "display": "Feasibility Query",
  "inclusionCriteria": [
    [
      {
        "id": "fc293342-9430-ae38-d76d-410defa658b5",
        "termCodes": [
          {
            "code": "J44",
            "system": "http://fhir.de/CodeSystem/bfarm/icd-10-gm",
            "display": "Sonstige chronische obstruktive Lungenkrankheit",
            "version": "2024"
          }
        ],
        "context": {
          "code": "Diagnose",
          "display": "Diagnose",
          "system": "fdpg.mii.cds",
          "version": "2.2.0"
        },
        "isLocalFilter": false
      }
    ],
    [
      {
        "id": "58de495f-da04-c758-a557-1a146b54dfb8",
        "termCodes": [
          {
            "code": "711-2",
            "system": "http://loinc.org",
            "display": "Eosinophils [#/volume] in Blood by Automated count",
            "version": "2.40"
          }
        ],
        "context": {
          "code": "Laboruntersuchung",
          "display": "Laboruntersuchung",
          "system": "fdpg.mii.cds",
          "version": "2.2.0"
        },
        "isLocalFilter": false
      },
      {
        "id": "51b57b20-ece9-4347-276c-5528cef22cfe",
        "termCodes": [
          {
            "code": "712-0",
            "system": "http://loinc.org",
            "display": "Eosinophils [#/volume] in Blood by Manual count",
            "version": "2.73"
          }
        ],
        "context": {
          "code": "Laboruntersuchung",
          "display": "Laboruntersuchung",
          "system": "fdpg.mii.cds",
          "version": "2.2.0"
        },
        "isLocalFilter": false
      }
    ]
  ],
  "exclusionCriteria": []
}
```

#### Logical Structure of Criteria
  The inclusionCriteria field is structured as a two-dimensional array.
  * Objects within the same array are combined using **OR**.
  * Different arrays are combined using **AND**.
    
    ```python 
	{
      "version": "1.0.0",
      "display": "Feasibility Query",
      "inclusionCriteria": [
        [{A}],
        [{B},{C}]
      ]
    }
    
    Means => A AND (B OR C)
