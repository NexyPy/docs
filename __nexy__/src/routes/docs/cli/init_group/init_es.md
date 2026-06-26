# nx inicio

Inicializa el andamio del proyecto Nexy en un directorio existente. Use esto para agregar Nexy a un proyecto Python existente.

{% raw %}```bash
nx init
```{% endraw %}

---

## Lo que crea

- `nexyconfig.py` — archivo de configuración principal
- `vite.config.ts` — Configuración de Vite (si los componentes del cliente están habilitados)
- `__nexy__/` — directorio de salida compilado (agregado a `.gitignore`)

---

## Notas

- `nx init` es interactivo: le solicita la configuración del proyecto
- Utilice `nx new` si desea especificar un nombre de proyecto y opciones desde el principio.

---

## Ejemplo

{% raw %}```bash
# Initialize in the current directory
nx init
```{% endraw %}

---

## Alias

`nx i`