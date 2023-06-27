<!-- Handling Submodule broken reference -->

To fix submodule broken reference, you first should delete the submodule folder and then run the  following two commands in the root folder of the project:

```bash
git submodule sync
git submodule update --init --recursive --remote
```

 