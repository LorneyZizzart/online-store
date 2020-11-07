export class ConvertData{
  static getFire(data: any):any[]{
      const convertirDatos = (accion: any) => {
          return {
            id: accion.payload.doc.id,
            ...accion.payload.doc.data(),
          } as any;
        };

     return data.map(convertirDatos) 
  }
}