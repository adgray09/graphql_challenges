# CRUD queries

### 1. (C)reate
```
mutation {
    addPet(name: "My Pet", "Their species") {
        name
        species
    }
}
 ```
### 2. (R)ead 
```
{
    getPet(id: 1) {
        name
        species
    }
}
 ``` 
### 3. (U)pdate
``` 
mutation {
    updatePet(id: 1, name: "New Name", species: "New Species") {
        name
        species
    }
}
```
### 4. (D)elete/(D)estroy
```
mutation {
  deletePet(id: 1) {
    name
  }
}
```