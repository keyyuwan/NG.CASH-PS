function desmascaraNumeroBR(valor?: string) {
  if (!valor) return 0;
  return +valor.replace(/[^\d-]/g, "");
}

function mascaraNumeroBR(valor?: number | string) {
  if (!valor) return "0,00";
  if (typeof valor === "string") {
    valor = desmascaraNumeroBR(valor);
  }
  if (typeof valor === "number") {
    const [inteiros, decimais] = (+valor / 100).toFixed(2).split(".");
    return `${inteiros.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${decimais}`;
  }
  return "0,00";
}

export function desmascaraBRL(valor?: string) {
  if (!valor) return 0;
  return desmascaraNumeroBR(valor.replace(/R\$ /g, ""));
}

export function mascaraBRL(valor?: number | string) {
  if (!valor) return "R$ 0,00";
  if (typeof valor === "string") {
    valor = desmascaraBRL(valor);
  }
  if (typeof valor === "number") {
    if (valor < 0) return `-R$ ${mascaraNumeroBR(-valor)}`;
    else return `R$ ${mascaraNumeroBR(valor)}`;
  }
  return "R$ 0,00";
}
