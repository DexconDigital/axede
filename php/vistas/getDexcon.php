<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, X-Auth-Token, Origin, Authorization');
$req_method = $_SERVER['REQUEST_METHOD'];
// $_POST = $_GET;
class nuevoPDO
{
  private $querySql = array();
  private $options = array();
  public $res;
  public $resquery;
  public $content = "";
  private $db;
  private $token;

    public function __construct()
    {
      include "../conexion/connectPDO.php";
        $this->db = $db;
        $this->token = $token;

        $this->createQuery();
        $this->executeQuery();  
    }

    private function createQuery(){
      $arrayOptions = array();

      switch ($_POST['get']) {
          
          case 'login':
              $this->querySql['query'] = 'SELECT r.Alias as Rol, u.Id as Id, u.Usuario as Nombre, up.IdProyecto from usuarios as u inner join roles as r on u.IdRol = r.Id left join usuarios_proyectos as up on u.Id = up.IdUsuario where u.Id = :id';
              array_push($arrayOptions,"id");
              break;

          case 'empresas':
              $this->querySql['query'] = 'SELECT e.Id, e.Nombre, e.MacroprocesoEvaluacion, count(p.Id) as Procesos, count(z.Id) as Zonas FROM empresas as e left join empresa_procesos as p on e.Id = p.IdEmpresa left join empresa_zonas as z on e.Id = z.IdEmpresa GROUP BY e.Id';
              break;

          case 'empresaDatos':
              $this->querySql['query'] = 'SELECT e.*,c.Nombre as Contacto,c.Telefono as ContactoTelefono,c.Movil as ContactoMovil,c.Correo as ContactoCorreo,c.Cargo as ContactoCargo FROM empresas as e inner join empresa_contactos as c on e.Id = c.IdEmpresa where e.Id = :idEmpresa';
              array_push($arrayOptions,"idEmpresa");
              break;

          case 'empresaContratos':
              $this->querySql['query'] = 'SELECT ec.* from proyectos as p INNER JOIN empresa_contratos as ec on p.IdContrato = ec.Id where p.IdEmpresa = :idEmpresa and p.IdNorma <> :idNorma GROUP By NoContrato';
              array_push($arrayOptions, "idEmpresa", "idNorma");
              break;

          case 'empresaProcesos':
              $this->querySql['query'] = 'SELECT pc.IdTipo, pc.Cantidad, pt.Tipo, pt.Alias, p.Nombre, p.IdPadre,p.Id FROM empresa_cantidadprocesos as pc inner join empresa_procesostipo as pt on pc.IdTipo = pt.Id left join empresa_procesos as p on p.IdEmpresa = pc.IdEmpresa and p.IdTipo = pc.IdTipo where pc.IdEmpresa = :idEmpresa order by pc.IdTipo';
              array_push($arrayOptions,"idEmpresa");
              break;

          case 'empresaZonas':
              $this->querySql['query'] = 'SELECT z.Id,z.Nombre FROM empresas as e inner join empresa_zonas as z on z.IdEmpresa = e.Id where e.Id = :idEmpresa';
              array_push($arrayOptions,"idEmpresa");
              break;

          case 'empresaProcesosZonas':
              $this->querySql['query'] = 'SELECT p.Id, p.IdPadre, p.Nombre as ProcesoMacro, p2.Id as IdProceso, p2.Nombre as Proceso, p3.Id as IdSubProceso, p3.Nombre as SubProceso FROM empresa_procesos as p left join empresa_procesos as p2 on p.Id = p2.IdPadre left join empresa_procesos as p3 on p2.Id = p3.IdPadre where p.IdEmpresa = :idEmpresa && p.IdPadre = 0 UNION SELECT *, " ", " "," ", " " FROM empresa_zonas where IdEmpresa = :idEmpresa order by Id, IdProceso';
              array_push($arrayOptions,"idEmpresa");
              break;

          case 'empresaDetalle':
              $this->querySql['query'] = "SELECT 'e', e.* FROM empresas as e where e.Id = :idEmpresa UNION SELECT 'c', c.*,'','','','' FROM empresas as e inner join empresa_contactos as c on e.Id = c.IdEmpresa where e.Id = :idEmpresa UNION SELECT 'p', pt.Id,p.IdPadre,p.Id,p.Nombre,pt.Alias,p2.Id,p2.Nombre,pt2.Alias,p3.Id,p3.Nombre,pt3.Alias FROM empresas as e left join empresa_procesos as p on p.IdEmpresa = e.Id left join empresa_procesos as p2 on p.Id = p2.IdPadre left join empresa_procesos as p3 on p2.Id = p3.IdPadre inner join empresa_procesostipo as pt on p.IdTipo = pt.Id left join empresa_procesostipo as pt2 on pt2.Id = p2.IdTipo left join empresa_procesostipo as pt3 on pt3.Id = p3.IdTipo where e.Id = :idEmpresa and p.IdPadre = 0 UNION SELECT 'z',z.*,'','','','','','','','' FROM empresas as e left join empresa_zonas as z on z.IdEmpresa = e.Id where e.Id = :idEmpresa order by e, Id, Direccion, Telefono";
              array_push($arrayOptions,"idEmpresa");
              break;

          case 'profesionales':
              $this->querySql['query'] = 'SELECT * FROM profesionales';
              break;
          
          case 'peligros':
              $this->querySql['query'] = 'SELECT p.Id,p.Descripcion,p.Clasificacion,p.Consecuencia,p.RequisitoLegal,e.Id as IdEfecto,e.Nombre as efecto, pe.Id as IdPeor,pe.Nombre as peor FROM peligros as p inner join peligros_efectos as e on p.Id = e.IdPeligro inner join peligros_peorconsecuencia as pe on p.Id = pe.IdPeligro ORDER by p.Id, pe.Id, e.Id';
              break;

          case 'normas':
              $this->querySql['query'] = 'SELECT * FROM normas';
              break;

          case 'listaProyectos':
              $this->querySql['query'] = 'SELECT p.Id,p.IdNorma,e.Nombre,e.Nit,p.IdEmpresa,ec.NoContrato,ec.FechaInicio,ec.FechaFinal FROM proyectos as p inner join empresas as e on p.IdEmpresa = e.Id inner join empresa_contratos as ec on p.IdContrato = ec.Id where p.IdNorma =:idNorma';
              array_push($arrayOptions,"idNorma");
              break;

          case 'gtcEtapasProyecto':
              $this->querySql['query'] = 'SELECT p.IdEtapa,zo.Id as IdZona,po.Id as IdProceso, po.Nombre as Proceso, zo.Nombre as Zona FROM gtc_etapas as e inner join gtc_procesosporetapa as p on e.Id = p.IdEtapa inner join gtc_zonasporetapa as z on e.Id = z.IdEtapa inner join empresa_procesos as po on p.IdProceso = po.Id inner join empresa_zonas as zo on z.IdZona = zo.Id where e.IdProyecto = :idProyecto ORDER BY p.IdEtapa, zo.Id';
              array_push($arrayOptions,"idProyecto");
              break;

          case 'gtcRiesgosEtapas':
              $this->querySql['query'] = 'SELECT pr.IdEtapa,pro.Nombre,p.Actividad,p.Rutinario,p.IdPeligro,pe.Descripcion as Peligro, p.Deficiencia, p.Exposicion, p.Fuente, p.Medio, p.Individuo, p.NombreFuente, p.NombreMedio, p.NombreIndividuo, p.NoExpuestos, p.Foto, i.id as IdIntervencion, i.Eliminacion, i.Sustitucion, i.Ingenieria, i.Administrativo, i.Epp, i.NombreEpp FROM gtc_etapas as e left join gtc_peligrosporetapa as p on e.Id = p.IdEtapa inner join gtc_procesosporetapa as pr on e.Id = pr.IdEtapa left join peligros as pe on p.IdPeligro = pe.Id inner join empresa_procesos as pro on pro.Id = pr.IdProceso left join gtc_intervencion as i on p.Id = i.IdPeligroEtapa where e.IdProyecto = :idProyecto ORDER BY pr.IdEtapa,pr.IdProceso';
              array_push($arrayOptions,"idProyecto");
              break;

          case 'estrategiaEmpresa':
              $this->querySql['query'] = 'SELECT * from estrategia_empresa as ee where ee.IdProyecto = :idProyecto';
              array_push($arrayOptions,"idProyecto");
              break;

          case 'estrategiaMatrizAxiologica':
              $this->querySql['query'] = 'SELECT *,"gr" as Tipo from estrategia_gruposreferencia as gr where gr.IdProyecto = :idProyecto UNION SELECT *,"pc" from estrategia_principioscorporativos as pc where pc.IdProyecto = :idProyecto UNION SELECT * FROM estrategia_matrizaxiologica as ma where ma.IdProyecto = :idProyecto ORDER BY Tipo desc,Id';
              array_push($arrayOptions,"idProyecto");
              break;

          case 'estrategiaMisionVision':
              $this->querySql['query'] = 'SELECT * from estrategia_misionvision as ee where ee.IdProyecto = :idProyecto';
              array_push($arrayOptions,"idProyecto");
              break;

          case 'estrategiaDiagnostico':
              $this->querySql['query'] = 'SELECT etd.Id as IdDiagnostico, etd.Nombre as NombreDiagnostico, etd.Alias as AliasDiagnostico, eid.Id as IdItem, eid.Item as NombreItem, eid.Alias as AliasItem, ed.Id, ed.Descripcion, ed.FortalezaNivel, ed.FortalezaImpacto, ed.DebilidadNivel, ed.DebilidadImpacto from estrategia_tipodiagnostico as etd inner join estrategia_itemsdiagnostico as eid on etd.Id = eid.Tipo left join estrategia_diagnostico as ed on eid.Id = ed.ItemPadre && (ed.IdProyecto = :idProyecto or ed.IdProyecto is null) where etd.Alias = :tipoDiagnostico order by IdItem, Id';
              array_push($arrayOptions,"idProyecto","tipoDiagnostico");
              break;    

          case 'estrategiaAnalisisVulnerabilidad':
              $this->querySql['query'] = 'SELECT * FROM estrategia_analisisvulnerabilidad as eav where eav.IdProyecto =:idProyecto';
              array_push($arrayOptions,"idProyecto");
              break;    

          case 'estrategiaDofaResumen':
              $this->querySql['query'] = 'SELECT etd.Id as IdDiagnostico, etd.Nombre as NombreDiagnostico, etd.Alias as AliasDiagnostico, eid.Id as IdItem, eid.Item as NombreItem, eid.Alias as AliasItem, ed.Id, ed.Descripcion, ed.FortalezaNivel, ed.FortalezaImpacto, ed.DebilidadNivel, ed.DebilidadImpacto, edr.Resumen from estrategia_tipodiagnostico as etd inner join estrategia_itemsdiagnostico as eid on etd.Id = eid.Tipo left join estrategia_diagnostico as ed on eid.Id = ed.ItemPadre left join estrategia_dofaresumido as edr on edr.IdProyecto = ed.IdProyecto where (ed.IdProyecto = :idProyecto or ed.IdProyecto is null) order by IdItem, Id';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaFuerzasPorter':
              $this->querySql['query'] = 'SELECT * from estrategia_fuerzasporter as ef where ef.IdProyecto = :idProyecto';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaMatrizBCG':
              $this->querySql['query'] = 'SELECT * from estrategia_matrizbcg as ef where ef.IdProyecto = :idProyecto';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaAnalisisDofa':
              $this->querySql['query'] = '(SELECT "Item" as Tipo, ed.Id, ed.Descripcion, ed.FortalezaNivel, eid.Alias FROM estrategia_diagnostico as ed inner join estrategia_itemsdiagnostico as eid on ed.ItemPadre = eid.Id where ed.IdProyecto = :idProyecto ORDER BY eid.Tipo, (ed.FortalezaNivel*ed.FortalezaImpacto) DESC, (ed.DebilidadNivel*ed.DebilidadImpacto) DESC, ed.ItemPadre) UNION (SELECT "DofaItems", etade.*, "" FROM estrategia_tipoanalisisdofa as etade) UNION (select "Seleccion", ed.Id, eid.Alias, etad.Nombre, etad.Alias from estrategia_diagnostico as ed left join estrategia_dofaitems as edi on ed.Id = edi.IdItem left join estrategia_tipoanalisisdofa as etad on edi.IdTipo = etad.Id left join estrategia_itemsdiagnostico as eid on ed.ItemPadre = eid.Id where ed.IdProyecto = :idProyecto order BY etad.Id) UNION (SELECT "Matriz", IdPos1, IdPos2, emd.Value, "" FROM estrategia_matrizdofa as emd left join estrategia_diagnostico as ed on emd.IdPos1 = ed.Id where ed.IdProyecto = :idProyecto ORDER BY emd.IdPos1)';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaConductoresValor':
              $this->querySql['query'] = 'SELECT * from estrategia_conductoresvalor as ec where ec.IdProyecto = :idProyecto';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaPalancas':
              $this->querySql['query'] = 'SELECT ecv.Id as IdConductor, ecv.ConductorValor, ep.Id as IdPalanca, ep.Palanca from estrategia_conductoresvalor as ecv left join estrategia_palancas as ep on ecv.Id = ep.IdConductor where ecv.IdProyecto = :idProyecto order by IdConductor, IdPalanca';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaEstrategias':
              $this->querySql['query'] = 'SELECT "estrategia" as tabla, ecv.Id as IdConductor, ecv.ConductorValor, ep.Id as IdPalanca, ep.Palanca, ee.Id as IdEstrategia, ee.IdTipo as Tipo, ee.Estrategia from estrategia_conductoresvalor as ecv left join estrategia_palancas as ep on ecv.Id = ep.IdConductor left join estrategia_estrategia as ee on ep.Id = ee.IdPalanca where ecv.IdProyecto = :idProyecto UNION SELECT "tipo",0,"",ate.*,"" from estrategia_tipoestrategia as ate order by IdConductor, IdPalanca, IdEstrategia';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaIniciativas':
              $this->querySql['query'] = 'SELECT ecv.ConductorValor, ep.Palanca, ee.Id as IdEstrategia, ete.Color, ee.Estrategia,ei.Id as IdIniciativa, ei.Iniciativa, ea.Id, ea.Actividad, ea.Responsable, ea.FechaInicio, ea.FechaFinal, ea.Recursos from estrategia_conductoresvalor as ecv left join estrategia_palancas as ep on ecv.Id = ep.IdConductor left join estrategia_estrategia as ee on ep.Id = ee.IdPalanca left join estrategia_iniciativa as ei on ei.IdEstrategia = ee.Id inner join estrategia_tipoestrategia as ete on ee.IdTipo = ete.Id left join estrategia_actividades as ea on ea.IdIniciativa = ei.Id where ecv.IdProyecto = :idProyecto order by ecv.Id, ep.Id, IdEstrategia, IdIniciativa,Id';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'estrategiaKpi':
              $this->querySql['query'] = 'SELECT ecv.ConductorValor, ep.Palanca, ete.Color, ee.Estrategia, ei.Iniciativa, ea.Id as IdActividad, ea.Actividad, ek.Nombre, ek.Frecuencia, ek.Valor1, ek.Valor2, ek.Formula from estrategia_conductoresvalor as ecv inner join estrategia_palancas as ep on ecv.Id = ep.IdConductor inner join estrategia_estrategia as ee on ep.Id = ee.IdPalanca inner join estrategia_iniciativa as ei on ei.IdEstrategia = ee.Id inner join estrategia_tipoestrategia as ete on ee.IdTipo = ete.Id inner join estrategia_actividades as ea on ea.IdIniciativa = ei.Id left join estrategia_kpis as ek on ea.Id = ek.IdActividad where ecv.IdProyecto = :idProyecto order by ecv.Id, ep.Id, ee.Id, ei.Id, IdActividad';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'IniciativasKpi':
              $this->querySql['query'] = 'SELECT ecv.ConductorValor, ep.Palanca, ete.Color, ee.Estrategia, ei.Iniciativa, ea.Id as IdActividad, ea.Actividad, ek.Nombre, ek.Frecuencia, ek.Valor1, ek.Valor2, ek.Formula, ea.FechaInicio, ea.FechaFinal from estrategia_conductoresvalor as ecv inner join estrategia_palancas as ep on ecv.Id = ep.IdConductor inner join estrategia_estrategia as ee on ep.Id = ee.IdPalanca inner join estrategia_iniciativa as ei on ei.IdEstrategia = ee.Id inner join estrategia_tipoestrategia as ete on ee.IdTipo = ete.Id inner join estrategia_actividades as ea on ea.IdIniciativa = ei.Id inner join estrategia_kpis as ek on ea.Id = ek.IdActividad where ecv.IdProyecto = :idProyecto order by ecv.Id, ep.Id, ee.Id, ei.Id, IdActividad';
              array_push($arrayOptions,"idProyecto");
              break; 

          case 'gtcResumenDetalle':
              $this->querySql['query'] = 'SELECT p.Id, p.Actividad, p.Rutinario, p.Foto, pro.Id as IdProceso, pro.Nombre as Proceso, i.Administrativo, pef.Id as IdConsecuencia, pef.Nombre as Consecuencia, pe.Descripcion FROM gtc_peligrosporetapa as p left join gtc_etapas as e on e.Id = p.IdEtapa inner join gtc_procesosporetapa as pr on e.Id = pr.IdEtapa left join peligros as pe on p.IdPeligro = pe.Id left join peligros_efectos as pef on pe.Id = pef.IdPeligro inner join empresa_procesos as pro on pro.Id = pr.IdProceso left join gtc_intervencion as i on p.Id = i.IdPeligroEtapa where p.Id = :idPeligro order by pro.Id, pef.Id';
              array_push($arrayOptions,"idPeligro");
              break;  

          case 'gtcResumen':
              $this->querySql['query'] = 'SELECT p.Id,p.IdNorma,e.Nombre,e.Nit,p.IdEmpresa,ec.NoContrato,ec.FechaInicio,ec.FechaFinal FROM proyectos as p inner join empresas as e on p.IdEmpresa = e.Id inner join empresa_contratos as ec on p.IdContrato = ec.Id inner join normas as n on p.IdNorma = n.Id WHERE n.Alias = "gtc"';
              break;

          case 'gtcResumenProyecto':
              $this->querySql['query'] = 'SELECT p.Id, pr.IdEtapa,pro.Nombre,p.Actividad,p.IdPeligro,pe.Descripcion as Peligro, pe.Consecuencia, p.Deficiencia, p.Exposicion, p.Foto FROM gtc_etapas as e left join gtc_peligrosporetapa as p on e.Id = p.IdEtapa inner join gtc_procesosporetapa as pr on e.Id = pr.IdEtapa left join peligros as pe on p.IdPeligro = pe.Id inner join empresa_procesos as pro on pro.Id = pr.IdProceso left join gtc_intervencion as i on p.Id = i.IdPeligroEtapa where e.IdProyecto = :idProyecto ORDER BY pr.IdEtapa,pr.IdProceso';
              array_push($arrayOptions,"idProyecto");
              break;

          case 'gtcResumenDetalle':
              $this->querySql['query'] = 'SELECT p.Id, p.Actividad, p.Rutinario, p.Foto, pro.Id as IdProceso, pro.Nombre as Proceso, i.Administrativo, pef.Id as IdConsecuencia, pef.Nombre as Consecuencia, pe.Descripcion FROM gtc_peligrosporetapa as p left join gtc_etapas as e on e.Id = p.IdEtapa inner join gtc_procesosporetapa as pr on e.Id = pr.IdEtapa left join peligros as pe on p.IdPeligro = pe.Id left join peligros_efectos as pef on pe.Id = pef.IdPeligro inner join empresa_procesos as pro on pro.Id = pr.IdProceso left join gtc_intervencion as i on p.Id = i.IdPeligroEtapa where p.Id = :idPeligro order by pro.Id, pef.Id';
              array_push($arrayOptions,"idPeligro");
              break;  

          default:
              $this->querySql['query'] = '';
      }

      $this->createOptions($arrayOptions);
    }

    private function createOptions($arrayOptions){
          foreach ($arrayOptions as $key => $value) {
          $this->options[':'.$value] = $_POST[$value];
        }
    }

    private function pdo_sql_debug($sql,$placeholders){
        foreach($placeholders as $k => $v){
            // echo $k,$v;
            $sql = preg_replace('/'.$k.'/',"'".$v."'",$sql);
        }
        return $sql;
    }

    private function executeQuery(){      
      $this->resquery = $this->pdo_sql_debug($this->querySql['query'],$this->options);
      // echo $this->resquery,"\n";
      $stmt = $this->db->prepare($this->querySql['query']);
      $this->res = $stmt->execute($this->options);
      if($this->res){
        // $this->content = $stmt->fetchAll();   
        $existen=$stmt->rowCount();

        switch ($_POST['get']) {

            case 'login':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Rol" => $row['Rol'],
                    "Token" => $this->token,
                    "Nombre" => $row['Nombre'],
                    "Id" => $row['Id'],
                    "IdProyecto" => $row['IdProyecto']
                    );
                }
                break;

            case 'empresas':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "Nombre" => $row['Nombre'],
                    "Evaluacion" => $row['MacroprocesoEvaluacion'],
                    "Procesos" => $row['Procesos'],
                    "Zonas" => $row['Zonas'],
                    );
                }
                break;

            case 'empresaDatos':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "Nombre" => $row['Nombre'],
                    "Direccion" => $row['Direccion'],
                    "Nit" => $row['Nit'],
                    "NitDv" => $row['DV'],
                    "Telefono" => $row['Telefono'],
                    "IdDexcon" => $row['IdDexcon'],
                    "EmpleadosDirectos" => $row['EmpleadosDirectos'],
                    "EmpleadosIndirectos" => $row['EmpleadosIndirectos'],
                    "Tipo" => $row['Tipo'],
                    "MacroprocesoEvaluacion" => $row['MacroprocesoEvaluacion'],
                    "Contacto" => array(
                      "Nombre" => $row['Contacto'],
                      "Cargo" => $row['ContactoCargo'],
                      "Telefono" => (int)$row['ContactoTelefono'],
                      "Movil" => (int)$row['ContactoMovil'],
                      "Correo" => $row['ContactoCorreo'],
                    )
                  );
                }
                break;

            case 'empresaContratos':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "NoContrato" => $row['NoContrato'],
                    "Detalle" => $row['Detalle'],
                    "NombreResponsable" => $row['NombreResponsable'],
                    "CargoResponsable" => $row['CargoResponsable'],
                    "CedulaResponsable" => $row['CedulaResponsable'],
                    "FechaInicio" => $row['FechaInicio'],
                    "FechaFinal" => $row['FechaFinal'],
                  );
                }
                break;

            case 'empresaProcesos':
                while ($row=$stmt->fetch()) {
                  if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['IdTipo'] == $row['IdTipo'])
                  {
                    $arraytemp = array(
                      'Nombre' => $row['Nombre'],
                      'IdPadre' => $row['IdPadre'],
                      'Id' => $row['Id'],
                      );
                    array_push($arreglo[count($arreglo)-1]['Procesos'],$arraytemp);
                  }
                  else{
                    if($row['Nombre'] != null){
                      $arraytemp = array(
                        array(
                          'Nombre' => $row['Nombre'],
                          'IdPadre' => $row['IdPadre'],
                          'Id' => $row['Id'],
                        )
                      );
                    }
                    else{
                      $arraytemp = array();
                    }
                    $arreglo[]=array(
                      "IdTipo" => $row['IdTipo'],
                      "Cantidad" => $row['Cantidad'],
                      'Procesos' => $arraytemp,
                      "Tipo" => $row['Tipo'],
                      "Alias" => $row['Alias'],
                      );
                  }
                }
                break;

            case 'empresaZonas':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "Nombre" => $row['Nombre'],
                  );
                }
                break;

            case 'empresaDetalle':
                $zona = "";
                $listoProcesos = false;
                $arreglo = array();
                $arreglo[0]['Procesos'] = array();
                while ($row=$stmt->fetch()) {
                    if($row['e'] == 'c'){
                      $arreglo[0]['Contacto'] = $row['Nombre'];
                      $arreglo[0]['ContactoTelefono'] = $row['Direccion'];
                      $arreglo[0]['ContactoMovil'] = $row['Nit'];
                      $arreglo[0]['ContactoCargo'] = $row['Telefono'];
                      $arreglo[0]['ContactoCorreo'] = $row['DV'];
                    }
                    else if($row['e'] == 'e'){
                      $arreglo[0]['Id'] = $row['Id'];
                      $arreglo[0]['Nombre'] = $row['Nombre'];
                      $arreglo[0]['Direccion'] = $row['Direccion'];
                      $arreglo[0]['Nit'] = $row['Nit'].'-'.$row['DV'];
                      $arreglo[0]['Telefono'] = $row['Telefono'];
                      $arreglo[0]['IdDexcon'] = $row['IdDexcon'];
                      $arreglo[0]['EmpleadosDirectos'] = $row['EmpleadosDirectos'];
                      $arreglo[0]['EmpleadosIndirectos'] = $row['EmpleadosIndirectos'];
                      $arreglo[0]['Tipo'] = $row['Tipo'];
                      $arreglo[0]['MacroprocesoEvaluacion'] = $row['MacroprocesoEvaluacion'];
                    }
                    else if($row['e'] == 'p'){
                      $p = $arreglo[0]['Procesos'];
                      // print_r($p);
                      if(isset($p) && count($p)>0 && $p[count($p)-1]['tipo'] == $row['DV']){
                        if($p[count($p)-1]['Nombre'] == $row['Nit']){
                          $p2 = $p[count($p)-1]['hijos'];
                          // print_r($p2);
                          if($p2[count($p2)-1]['Nombre'] == $row['IdDexcon']){
                            $arreglo[0]['Procesos'][count($p)-1]['hijos'][count($arreglo[0]['Procesos'][count($p)-1]['hijos']-1)]['hijos'][] = array('tipo' => $row['MacroprocesoEvaluacion'], 'Nombre' => array($row['Tipo']));
                          }
                          else{                            
                            if($row['Tipo'] == null){
                              $arreglo[0]['Procesos'][count($arreglo[0]['Procesos'])-1]['hijos'][] = array(
                                  'tipo' => $row['EmpleadosDirectos'],
                                  'Nombre' => $row['IdDexcon']);
                            }
                            else if($row['Tipo'] != null){
                              $arreglo[0]['Procesos'][count($arreglo[0]['Procesos'])-1]['hijos'][] = array(
                                  'tipo' => $row['EmpleadosDirectos'],
                                  'Nombre' => $row['IdDexcon'],
                                  'hijos' => array(
                                    'tipo' => $row['MacroprocesoEvaluacion'], 
                                    'Nombre' => array($row['Tipo'])
                                  )
                              );
                            }
                          }
                        }
                        else{                          
                          $arreglo[0]['Procesos'][]=array(
                            'Nombre' => $row['Nit'],
                            'tipo' => $row['DV']
                          );
                          if($row['Tipo'] == null && $row['IdDexcon'] != null){
                            $arreglo[0]['Procesos'][count($arreglo[0]['Procesos'])-1]['hijos'] = array(
                              array(
                                'tipo' => $row['EmpleadosDirectos'],
                                'Nombre' => $row['IdDexcon'])
                            );
                          }
                          else if($row['Tipo'] != null && $row['IdDexcon'] != null){
                            $arreglo[0]['Procesos'][count($arreglo[0]['Procesos'])-1]['hijos'] = array(
                                'tipo' => $row['EmpleadosDirectos'],
                                'Nombre' => $row['IdDexcon'],
                                'hijos' => array(
                                  'tipo' => $row['MacroprocesoEvaluacion'], 
                                  'Nombre' => array($row['Tipo'])
                                )
                            );
                          }
                        }
                      }
                      else{
                        // print_r($p[count($p)-1]['procesos']);
                        $arreglo[0]['Procesos'][] = array(
                          'Nombre' => $row['Nit'],
                          'tipo' => $row['DV']
                        );
                        if($row['Tipo'] == null && $row['IdDexcon'] != null){
                          $arreglo[0]['Procesos'][count($arreglo[0]['Procesos'])-1]['hijos'] = array(
                            array(
                              'tipo' => $row['EmpleadosDirectos'],
                              'Nombre' => $row['IdDexcon'])
                          );
                        }
                        else if($row['Tipo'] != null && $row['IdDexcon'] != null){
                          $arreglo[0]['Procesos'][count($arreglo[0]['Procesos'])-1]['hijos'] = array(
                              'tipo' => $row['EmpleadosDirectos'],
                              'Nombre' => $row['IdDexcon'],
                              'hijos' => array(
                                'tipo' => $row['MacroprocesoEvaluacion'], 
                                'Nombre' => array($row['Tipo'])
                              )
                          );
                        }
                      }
                    }
                    else if($row['e'] == 'z'){
                      $arreglo[0]['Zonas'][] = $row['Nombre'];
                    }
                  }
                  break;

            case 'empresaProcesosZonas':
                $arreglo[]=array();
                while ($row=$stmt->fetch()) {
                  if($row['SubProceso'] == " ")                    
                    $arreglo[1][]=array(
                      "Id" => $row['Id'],
                      "Nombre" => $row['IdPadre'],
                      // "Nombre" => $row['Nombre'],
                      );
                  else{
                    if(count($arreglo[0])>0 && $arreglo[0][count($arreglo[0])-1]['Id'] == $row['Id'])
                      {
                        if($row['Proceso'] == $proceso)
                        {
                          $arraytemp = array(
                            "Id" => $row['IdSubProceso'],
                            'Nombre' => $row['SubProceso'],
                            );                          
                          $cmacroprocesos = count($arreglo[0][count($arreglo[0])-1]['Procesos'])-1;
                          array_push($arreglo[0][count($arreglo[0])-1]['Procesos'][$cmacroprocesos]['SubProcesos'],$arraytemp);
                        }
                        else
                        {
                          $proceso = $row['Proceso'];
                          $arraytemp = array(
                              "Id" => $row['IdProceso'],
                              'Nombre' => $row['Proceso'],
                              'SubProcesos' => array(
                                array(
                                  "Id" => $row['IdSubProceso'],
                                  'Nombre' => $row['SubProceso'],
                                  ),
                                )
                              );
                          array_push($arreglo[0][count($arreglo[0])-1]['Procesos'],$arraytemp);
                        }
                      }
                    else{
                      $procesomacro = $row['ProcesoMacro'];
                      $proceso = $row['Proceso'];
                      $arreglo[0][]=array(
                      "Id" => $row['Id'],
                      'Nombre' => $row['ProcesoMacro'],
                      'Procesos' => array(
                          array(
                          "Id" => $row['IdProceso'],
                          'Nombre' => $row['Proceso'],
                          'SubProcesos' => array(
                              array(
                              "Id" => $row['IdSubProceso'],
                              'Nombre' => $row['SubProceso'],
                              ),
                            )
                          )
                        ),
                      );
                    }                    
                  }
                }
                break;

            case 'profesionales':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "Nombre" => $row['Nombres'],
                    "Cedula" => $row['Cedula'],
                    "Direccion" => $row['Direccion'],
                    "Telefono" => $row['Telefono'],
                    "Movil" => $row['Movil'],
                    "Correo" => $row['Correo'],
                    "Profesion" => $row['Profesion'],
                    "Rut" => $row['Rut'],
                    "Especialidades" => $row['Especialidades'],
                    );
                }
                break;

            case 'peligros':
              $listoEfectos = false;
                while ($row=$stmt->fetch()) {
                    if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['Id'] == $row['Id'])
                      {
                        if($row['IdPeor'] == $peor && !$listoEfectos)
                        {
                          array_push($arreglo[count($arreglo)-1]['Efectos'],$row['efecto']);
                          $arreglo[count($arreglo)-1]['CantidadEfectos']++;
                        }
                        else if($row['IdPeor'] != $peor)
                        {
                          $listoEfectos = true;
                          $peor = $row['IdPeor'];
                          array_push($arreglo[count($arreglo)-1]['PeorConsecuencia'],$row['peor']);
                          $arreglo[count($arreglo)-1]['CantidadPeorConsecuencia']++;
                        }
                      }
                    else{
                      $listoEfectos = false;
                      $peor = $row['IdPeor'];
                      $arreglo[]=array(
                      "Id" => $row['Id'],
                      "Descripcion" => $row['Descripcion'],
                      "Clasificacion" => $row['Clasificacion'],
                      "Efectos" => array($row['efecto']),
                      "Consecuencia" => $row['Consecuencia'],
                      "PeorConsecuencia" => array($row['peor']),
                      "Requisito" => $row['RequisitoLegal'],
                      "CantidadEfectos" => 1,
                      "CantidadPeorConsecuencia" => 1,
                      );
                    }
                  }
                break;

            case 'normas':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "Nombre" => $row['Nombre'],
                    "Alias" => $row['Alias'],
                    );
                }
                break;

            case 'listaProyectos':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "IdEmpresa" => $row['IdEmpresa'],
                    "IdNorma" => $row['IdNorma'],
                    "NombreEmpresa" => $row['Nombre'],
                    "NitEmpresa" => $row['Nit'],
                    "NoContrato" => $row['NoContrato'],
                    "FechaInicio" => $row['FechaInicio'],
                    "FechaFinal" => $row['FechaFinal'],
                    );
                }
                break;

            case 'gtcEtapasProyecto':
              $zona = "";
              $listoproceso = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['IdEtapa'] == $row['IdEtapa'])
                  {
                    // print_r($arreglo);
                    // print_r($row);
                    // echo($zona);
                    // $anterior = $arreglo[count($arreglo)-1];    
                    if($row['Zona'] == $zona && !($listoproceso))
                    {
                      $arreglo[count($arreglo)-1]['Proceso'] .= ", ".$row['Proceso'];
                      array_push($arreglo[count($arreglo)-1]['IdProcesos'],$row['IdProceso']);
                    }
                    else if($row['Zona'] != $zona)
                    {
                      $listoproceso = true;
                      $zona = $row['Zona'];
                      $arreglo[count($arreglo)-1]['Zona'] .= ", ".$row['Zona'];
                      array_push($arreglo[count($arreglo)-1]['IdZonas'],$row['IdZona']);
                    }
                  }
                else{
                  $zona = $row['Zona'];
                  $listoproceso = false;
                  $arreglo[]=array(
                    "IdEtapa" => $row['IdEtapa'],
                    "IdProcesos" => array($row['IdProceso']),
                    "IdZonas" => array($row['IdZona']),
                    "Proceso" => $row['Proceso'],
                    "Zona" => $row['Zona'],
                  );
                }
              }
              break;

            case 'gtcRiesgosEtapas':
              $Proceso = "";
              $listoPeligros = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['IdEtapa'] == $row['IdEtapa']){
                  if($Proceso == $row['Nombre'] && !$listoPeligros)
                  {
                    // $arreglo[count($arreglo)-1]['Proceso'] .= ", ".$row['Nombre'];
                    $peligro = array(
                      "IdPeligro" => $row['IdPeligro'],
                      "Actividad" => $row['Actividad'],
                      "Rutinario" => $row['Rutinario'],
                      "Peligro" => $row['Peligro'],
                      "Deficiencia" => $row['Deficiencia'],
                      "Exposicion" => $row['Exposicion'],
                      "Fuente" => $row['Fuente'],
                      "Medio" => $row['Medio'],
                      "Individuo" => $row['Individuo'],
                      "NombreFuente" => $row['NombreFuente'],
                      "NombreMedio" => $row['NombreMedio'],
                      "NombreIndividuo" => $row['NombreIndividuo'],
                      "NoExpuestos" => $row['NoExpuestos'],
                      "IdIntervencion" => $row['IdIntervencion'],
                      "Eliminacion" => $row['Eliminacion'],
                      "Sustitucion" => $row['Sustitucion'],
                      "Ingenieria" => $row['Ingenieria'],
                      "Administrativo" => $row['Administrativo'],
                      "Epp" => $row['Epp'],
                      "NombreEpp" => $row['NombreEpp'],
                      "Foto" => $row['Foto'],
                    );
                    array_push($arreglo[count($arreglo)-1]['Peligros'],$peligro);
                  }
                  else if($Proceso != $row['Nombre'])
                  {
                    $listoPeligros = true;
                    $Proceso = $row['Nombre'];
                    $arreglo[count($arreglo)-1]['Proceso'] .= ", ".$row['Nombre'];
                  }
                }
                else{
                  $listoPeligros = false;
                  $Proceso = $row['Nombre'];
                  $arreglo[]=array(
                    "IdEtapa" => $row['IdEtapa'],
                    "Proceso" => $row['Nombre'],
                    "Peligros" => array(array(
                      "IdPeligro" => $row['IdPeligro'],
                      "Actividad" => $row['Actividad'],
                      "Rutinario" => $row['Rutinario'],
                      "Peligro" => $row['Peligro'],
                      "Deficiencia" => $row['Deficiencia'],
                      "Exposicion" => $row['Exposicion'],
                      "Fuente" => $row['Fuente'],
                      "Medio" => $row['Medio'],
                      "Individuo" => $row['Individuo'],
                      "NombreFuente" => $row['NombreFuente'],
                      "NombreMedio" => $row['NombreMedio'],
                      "NombreIndividuo" => $row['NombreIndividuo'],
                      "NoExpuestos" => $row['NoExpuestos'],
                      "IdIntervencion" => $row['IdIntervencion'],
                      "Eliminacion" => $row['Eliminacion'],
                      "Sustitucion" => $row['Sustitucion'],
                      "Ingenieria" => $row['Ingenieria'],
                      "Administrativo" => $row['Administrativo'],
                      "Epp" => $row['Epp'],
                      "NombreEpp" => $row['NombreEpp'],
                      "Foto" => $row['Foto'],
                      )
                    ),
                  );
                }
              }
              break;

            case 'estrategiaEmpresa':
              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "IdProyecto" => $row['IdProyecto'],
                  "AnoInicial" => (int)$row['AnoInicial'],
                  "AnoFinal" => (int)$row['AnoFinal'],
                  "Estrategas" => $row['Estrategas'],
                  );
              }
              break;

            case 'estrategiaMatrizAxiologica':
              $cantidadgr = 0;
              $cantidadpc = 0;
              while ($row=$stmt->fetch()) {
                if($row['Tipo'] == "pc"){
                  $cantidadpc++;
                  $arreglo['PrincipiosCorporativos'][]=$row['Nombre'];
                }
                else if($row['Tipo'] == "gr"){
                  $cantidadgr++;
                  $arreglo['GruposdeReferencia'][]=$row['Nombre'];
                }
                else{
                  $arreglo['Matriz'][$row['Nombre']]= intval($row['Tipo']);
                }
              }
              $arreglo['CantidadGruposdeReferencia'] = $cantidadgr;
              $arreglo['CantidadPrincipiosCorporativos'] = $cantidadpc;
              break;

            case 'estrategiaMisionVision':
              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "IdProyecto" => $row['IdProyecto'],
                  "Mision" => $row['Mision'],
                  "Vision" => $row['Vision'],
                  );
              }
              break;

            case 'estrategiaDofaResumen':
              $Proceso = "";
              $listoPeligros = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['IdDiagnostico'] == $row['IdDiagnostico']){
                  if($idItem == $row['IdItem']){
                    $descripcion = array(
                      // "Id" => $row['Id'],
                      "Descripcion" => $row['Descripcion'],
                      "FortalezaNivel" => $row['FortalezaNivel'],
                      "FortalezaImpacto" => $row['FortalezaImpacto'],
                      "DebilidadNivel" => $row['DebilidadNivel'],
                      "DebilidadImpacto" => $row['DebilidadImpacto'],
                      );
                    array_push($arreglo[count($arreglo)-1]['Items'][count($arreglo[count($arreglo)-1]['Items'])-1]["Descripciones"],$descripcion);
                  }
                  else if($idItem != $row['IdItem']){
                    $idItem = $row['IdItem'];
                    $item = array(
                      "IdItem" => $row['IdItem'],
                      "NombreItem" => $row['NombreItem'],
                      "AliasItem" => $row['AliasItem'],
                      "Descripciones" => array(array(
                        // "Id" => $row['Id'],
                        "Descripcion" => $row['Descripcion'],
                        "FortalezaNivel" => $row['FortalezaNivel'],
                        "FortalezaImpacto" => $row['FortalezaImpacto'],
                        "DebilidadNivel" => $row['DebilidadNivel'],
                        "DebilidadImpacto" => $row['DebilidadImpacto'],
                        )),
                      );
                    array_push($arreglo[count($arreglo)-1]['Items'],$item); 
                  }
                }
                else{
                  $idItem = $row['IdItem'];
                  $arreglo[]=array(
                    "IdDiagnostico" => $row['IdDiagnostico'],
                    "NombreDiagnostico" => $row['NombreDiagnostico'],
                    "AliasDiagnostico" => $row['AliasDiagnostico'],
                    "Resumen" => $row['Resumen'],
                    "Items" => array(array(
                      "IdItem" => $row['IdItem'],
                      "NombreItem" => $row['NombreItem'],
                      "AliasItem" => $row['AliasItem'],
                      "Descripciones" => array(array(
                        // "Id" => $row['Id'],
                        "Descripcion" => $row['Descripcion'],
                        "FortalezaNivel" => $row['FortalezaNivel'],
                        "FortalezaImpacto" => $row['FortalezaImpacto'],
                        "DebilidadNivel" => $row['DebilidadNivel'],
                        "DebilidadImpacto" => $row['DebilidadImpacto'],
                        )),
                      )),
                  );
                }
              }
              break; 

            case 'estrategiaDiagnostico':
              $Proceso = "";
              $listoPeligros = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['IdDiagnostico'] == $row['IdDiagnostico']){
                  if($idItem == $row['IdItem']){
                    $descripcion = array(
                      "Id" => $row['Id'],
                      "Descripcion" => $row['Descripcion'],
                      "FortalezaNivel" => $row['FortalezaNivel'],
                      "FortalezaImpacto" => $row['FortalezaImpacto'],
                      "DebilidadNivel" => $row['DebilidadNivel'],
                      "DebilidadImpacto" => $row['DebilidadImpacto'],
                      );
                    array_push($arreglo[count($arreglo)-1]['Items'][count($arreglo[count($arreglo)-1]['Items'])-1]["Descripciones"],$descripcion);
                  }
                  else if($idItem != $row['IdItem']){
                    $idItem = $row['IdItem'];
                    $item = array(
                      "IdItem" => $row['IdItem'],
                      "NombreItem" => $row['NombreItem'],
                      "AliasItem" => $row['AliasItem'],
                      "Descripciones" => array(array(
                        "Id" => $row['Id'],
                        "Descripcion" => $row['Descripcion'],
                        "FortalezaNivel" => $row['FortalezaNivel'],
                        "FortalezaImpacto" => $row['FortalezaImpacto'],
                        "DebilidadNivel" => $row['DebilidadNivel'],
                        "DebilidadImpacto" => $row['DebilidadImpacto'],
                        )),
                      );
                    array_push($arreglo[count($arreglo)-1]['Items'],$item); 
                  }
                }
                else{
                  $idItem = $row['IdItem'];
                  $arreglo[]=array(
                    "IdDiagnostico" => $row['IdDiagnostico'],
                    "NombreDiagnostico" => $row['NombreDiagnostico'],
                    "AliasDiagnostico" => $row['AliasDiagnostico'],
                    "Items" => array(array(
                      "IdItem" => $row['IdItem'],
                      "NombreItem" => $row['NombreItem'],
                      "AliasItem" => $row['AliasItem'],
                      "Descripciones" => array(array(
                        "Id" => $row['Id'],
                        "Descripcion" => $row['Descripcion'],
                        "FortalezaNivel" => $row['FortalezaNivel'],
                        "FortalezaImpacto" => $row['FortalezaImpacto'],
                        "DebilidadNivel" => $row['DebilidadNivel'],
                        "DebilidadImpacto" => $row['DebilidadImpacto'],
                        )),
                      )),
                  );
                }
              }
              break;  

            case 'estrategiaAnalisisVulnerabilidad':
              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "IdProyecto" => $row['IdProyecto'],
                  "Puntal" => $row['Puntal'],
                  "Amenaza" => $row['Amenaza'],
                  "Consecuencia" => $row['Consecuencia'],
                  "Impacto" => $row['Impacto'],
                  "Probabilidad" => $row['Probabilidad'],
                  "Reaccion" => $row['Reaccion'],
                  );
              }
              break;

            case 'estrategiaFuerzasPorter':
              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "IdProyecto" => $row['IdProyecto'],
                  "F1" => $row['F1'],
                  "F2" => $row['F2'],
                  "F3" => $row['F3'],
                  "F4" => $row['F4'],
                  "F5" => $row['F5'],
                  );
              }
              break;

            case 'estrategiaMatrizBCG':
              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "IdProyecto" => $row['IdProyecto'],
                  "Estrellas" => $row['Estrellas'],
                  "Interrogantes" => $row['Interrogantes'],
                  "Vaca" => $row['Vaca'],
                  "Perro" => $row['Perro'],
                  );
              }
              break;              

            case 'estrategiaAnalisisDofa':
                $arreglo[]=array();
                $arreglo['Seleccion'] = array();
                $arreglo['Seleccion']['items'] = array();
                $varTemp = "";
                while ($row=$stmt->fetch()) {
                  if($row['Tipo'] == "Item") {   
                    $arreglo['Items'][]=array(
                      "Id" => $row['Id'],
                      "Descripcion" => $row['Descripcion'],
                      "FortalezaNivel" => $row['FortalezaNivel'],
                      "Alias" => $row['Alias'],
                      );
                  }
                  else if($row['Tipo'] == "Seleccion") { 
                    if(count($arreglo['Seleccion'])>0 && $varTemp == $row['FortalezaNivel']){
                      $arrayTemp = array($row['Id'] => true);
                      if($row['Descripcion']{0} == 'c'){
                        $arreglo['Seleccion'][$row['FortalezaNivel']][$row['FortalezaNivel']{0}][$row['Id']] = true;
                      }
                      else if($row['Descripcion']{0} == 'f'){
                        $arreglo['Seleccion'][$row['FortalezaNivel']][$row['FortalezaNivel']{1}][$row['Id']] = true;
                      }
                    }
                    else {
                      $arrayTemp = array();
                      $varTemp = $row['FortalezaNivel'];
                      if($row['Descripcion']{0} == 'c'){
                        $arrayTemp[$row['FortalezaNivel']{0}] = array($row['Id'] => true);
                        $arrayTemp[$row['FortalezaNivel']{1}] = array();
                      }
                      else if($row['Descripcion']{0} == 'f'){
                        $arrayTemp[$row['FortalezaNivel']{0}] = array();
                        $arrayTemp[$row['FortalezaNivel']{1}] = array($row['Id'] => true);
                      }

                      $arreglo['Seleccion'][$row['FortalezaNivel']] = $arrayTemp;
                      array_push($arreglo['Seleccion']['items'],array(
                        'Alias' => $row['FortalezaNivel'],
                        'Nombre' => $row['Alias'],
                        ));
                    }
                  } 
                  else if($row['Tipo'] == "Matriz") { 
                    $arreglo['Matriz'][$row['Id']][$row['Descripcion']]=$row['FortalezaNivel'];
                  }
                  else if($row['Tipo'] == "DofaItems") { 
                    $arreglo['DofaItems'][] = array(
                        'Alias' => $row['Descripcion'],
                        'Nombre' => $row['FortalezaNivel'],
                        );
                    $arreglo['Seleccion'][$row['Descripcion']][$row['Descripcion']{0}] = array();
                    $arreglo['Seleccion'][$row['Descripcion']][$row['Descripcion']{1}] = array();
                  }
                }
                break;

            case 'estrategiaConductoresValor':
              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "Id" => $row['Id'],
                  "ConductorValor" => $row['ConductorValor'],
                  );
              }
              break;                

            case 'estrategiaPalancas':
              $listoPeligros = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['Id'] == $row['IdConductor']){
                  $palanca = array(
                    "Id" => $row['IdPalanca'],
                    "IdConductor" => $row['IdConductor'],
                    "Palanca" => $row['Palanca'],
                    );
                  array_push($arreglo[count($arreglo)-1]['Palancas'],$palanca);
                }
                else{
                  $arreglo[]=array(
                    "Id" => $row['IdConductor'],
                    "ConductorValor" => $row['ConductorValor'],
                    "Palancas" => array()
                  );
                  if($row['IdPalanca'] != null){
                    $palanca = array(
                      "Id" => $row['IdPalanca'],
                      "IdConductor" => $row['IdConductor'],
                      "Palanca" => $row['Palanca'],
                      );
                    array_push($arreglo[count($arreglo)-1]['Palancas'],$palanca);
                  }
                }
              }
              break;  

            case 'estrategiaEstrategias':
              $arreglo[]=array();
              $arreglo[]=array();

              $listoPeligros = false;
              while ($row=$stmt->fetch()) {
                if($row['tabla'] == "estrategia"){
                  if(isset($arreglo[0]) && count($arreglo[0])>0 && $arreglo[0][count($arreglo[0])-1]['Id'] == $row['IdPalanca']){
                    $estrategia = array(
                      "Id" => $row['IdEstrategia'],
                      "IdPalanca" => $row['IdPalanca'],
                      "Tipo" => $row['Tipo'],
                      "Estrategia" => $row['Estrategia'],
                      );
                    array_push($arreglo[0][count($arreglo[0])-1]['Estrategias'],$estrategia);
                  }
                  else{
                    $arreglo[0][]=array(
                      "Id" => $row['IdPalanca'],
                      "Palanca" => $row['ConductorValor']." - ".$row['Palanca'],
                      "Estrategias" => array()
                    );
                    if($row['IdEstrategia'] != null){
                      $estrategia = array(
                        "Id" => $row['IdEstrategia'],
                        "IdPalanca" => $row['IdPalanca'],
                        "Tipo" => $row['Tipo'],
                        "Estrategia" => $row['Estrategia'],
                        );
                      array_push($arreglo[0][count($arreglo[0])-1]['Estrategias'],$estrategia);
                    }
                  }
                }
                else if($row['tabla'] == "tipo"){
                  $arreglo[1][]=array(
                      "Id" => $row['IdPalanca'],
                      // "Palanca" => $row['Palanca'],
                      // "Color" => $row['IdEstrategia'],
                      "Alias" => $row['Tipo'],
                    );
                }
              }
              break;  

            case 'estrategiaIniciativas':
              $idIniciativa = 0;

              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['Id'] == $row['IdEstrategia']){
                  if($idIniciativa != $row['IdIniciativa']){
                    $estrategia = array(
                      "Id" => $row['IdEstrategia'],
                      "IdIniciativa" => $row['IdIniciativa'],
                      "Iniciativa" => $row['Iniciativa'],
                      "Actividades" => array()
                      );
                    array_push($arreglo[count($arreglo)-1]['Iniciativas'],$estrategia);
                    if($row['Id'] != null){
                      $actividad = array(
                        "Id" => $row['Id'],
                        "Actividad" => $row['Actividad'],
                        "Responsable" => $row['Responsable'],
                        "FechaInicio" => $row['FechaInicio'],
                        "FechaFinal" => $row['FechaFinal'],
                        "Recursos" => $row['Recursos'],
                        );
                      array_push($arreglo[count($arreglo)-1]['Iniciativas'][count($arreglo[count($arreglo)-1]['Iniciativas'])-1]['Actividades'],$actividad);
                    }  
                  }
                  else{
                    if($row['Id'] != null){
                      $actividad = array(
                        "Id" => $row['Id'],
                        "Actividad" => $row['Actividad'],
                        "Responsable" => $row['Responsable'],
                        "FechaInicio" => $row['FechaInicio'],
                        "FechaFinal" => $row['FechaFinal'],
                        "Recursos" => $row['Recursos'],
                        );
                      array_push($arreglo[count($arreglo)-1]['Iniciativas'][count($arreglo[count($arreglo)-1]['Iniciativas'])-1]['Actividades'],$actividad);
                    } 
                  }
                }
                else{
                  if($row['IdEstrategia'] != null){
                    $arreglo[]=array(
                      "Id" => $row['IdEstrategia'],
                      "Estrategia" => $row['ConductorValor']." - ".$row['Palanca']." - ".$row['Estrategia'],
                      "Color" => $row['Color'],
                      "Iniciativas" => array()
                    );
                    if($row['IdIniciativa'] != null){
                      $idIniciativa = $row['IdIniciativa'];
                      $estrategia = array(
                        "Id" => $row['IdEstrategia'],
                        "IdIniciativa" => $row['IdIniciativa'],
                        "Iniciativa" => $row['Iniciativa'],
                        "Actividades" => array()
                        );
                      array_push($arreglo[count($arreglo)-1]['Iniciativas'],$estrategia);
                      if($row['Id'] != null){
                        $actividad = array(
                          "Id" => $row['Id'],
                          "Actividad" => $row['Actividad'],
                          "Responsable" => $row['Responsable'],
                          "FechaInicio" => $row['FechaInicio'],
                          "FechaFinal" => $row['FechaFinal'],
                          "Recursos" => $row['Recursos'],
                          );
                        array_push($arreglo[count($arreglo)-1]['Iniciativas'][0]['Actividades'],$actividad);
                      }
                    }
                  }
                }
              }
              break;  

            case 'estrategiaKpi':
              $idIniciativa = 0;

              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  "ConductorValor" => $row['ConductorValor'],
                  "Palanca" => $row['Palanca'],
                  "Estrategia" => $row['Estrategia'],
                  "Color" => $row['Color'],
                  "Iniciativa" => $row['Iniciativa'],
                  "Actividad" => $row['Actividad'],
                  "IdActividad" => $row['IdActividad'],
                  "Kpi" => array(
                    'Nombre' => $row['Nombre'], 
                    'Frecuencia' => $row['Frecuencia'], 
                    'Valor1' => $row['Valor1'], 
                    'Valor2' => $row['Valor2'], 
                    'Formula' => $row['Formula'], 
                    )
                  );
              }
              break;

            case 'IniciativasKpi':
              $idIniciativa = 0;

              while ($row=$stmt->fetch()) {
                $arreglo[]=array(
                  // "ConductorValor" => $row['ConductorValor'],
                  // "Palanca" => $row['Palanca'],
                  // "Estrategia" => $row['Estrategia'],
                  // "Color" => $row['Color'],
                  "Iniciativa" => $row['Iniciativa'],
                  "Actividad" => $row['Actividad'],
                  // "IdActividad" => $row['IdActividad'],
                  'Inicio' => $row['FechaInicio'], 
                  'Final' => $row['FechaFinal'], 
                  // "Kpi" => array(
                    'Nombre' => $row['Nombre'], 
                    'Frecuencia' => $row['Frecuencia'], 
                    // 'Valor1' => $row['Valor1'], 
                    // 'Valor2' => $row['Valor2'], 
                    // 'Formula' => $row['Formula'], 
                    'Frecuencia' => $row['Frecuencia'], 
                    // )
                  );
              }
              break;
            
            case 'gtcResumen':
                while ($row=$stmt->fetch()) {
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "IdEmpresa" => $row['IdEmpresa'],
                    "IdNorma" => $row['IdNorma'],
                    "NombreEmpresa" => $row['Nombre'],
                    "NitEmpresa" => $row['Nit'],
                    "NoContrato" => $row['NoContrato'],
                    "FechaInicio" => $row['FechaInicio'],
                    "FechaFinal" => $row['FechaFinal'],
                    );
                }
                break;
            
            case 'gtcResumenProyecto':
              $Proceso = "";
              $listoPeligros = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['IdEtapa'] == $row['IdEtapa']){
                  if($Proceso == $row['Nombre'] && !$listoPeligros)
                  {
                    // $arreglo[count($arreglo)-1]['Proceso'] .= ", ".$row['Nombre'];
                    $peligro = array(
                      "Id" => $row['Id'],
                      "IdPeligro" => $row['IdPeligro'],
                      "Actividad" => $row['Actividad'],
                      "Peligro" => $row['Peligro'],
                      "Deficiencia" => $row['Deficiencia'],
                      "Exposicion" => $row['Exposicion'],
                      "Consecuencia" => $row['Consecuencia'],
                      "Foto" => $row['Foto'],
                    );
                    array_push($arreglo[count($arreglo)-1]['Peligros'],$peligro);
                  }
                  else if($Proceso != $row['Nombre'])
                  {
                    $listoPeligros = true;
                    $Proceso = $row['Nombre'];
                    $arreglo[count($arreglo)-1]['Proceso'] .= ", ".$row['Nombre'];
                  }
                }
                else{
                  $listoPeligros = false;
                  $Proceso = $row['Nombre'];
                  $arreglo[]=array(
                    "IdEtapa" => $row['IdEtapa'],
                    "Proceso" => $row['Nombre'],
                    "Peligros" => array(array(
                      "Id" => $row['Id'],
                      "IdPeligro" => $row['IdPeligro'],
                      "Actividad" => $row['Actividad'],
                      "Peligro" => $row['Peligro'],
                      "Deficiencia" => $row['Deficiencia'],
                      "Exposicion" => $row['Exposicion'],
                      "Consecuencia" => $row['Consecuencia'],
                      "Foto" => $row['Foto'],
                      )
                    ),
                  );
                }
              }
              break;

            case 'gtcResumenDetalle':
              $listoProcesos = false;
              while ($row=$stmt->fetch()) {
                if(isset($arreglo) && count($arreglo)>0 && $arreglo[count($arreglo)-1]['Id'] == $row['Id'])
                {
                  if($row['IdProceso'] == $idProceso && !$listoProcesos)
                  {
                    array_push($arreglo[count($arreglo)-1]['Consecuencias'],$row['Consecuencia']);
                  }
                  else if($row['IdProceso'] != $idProceso)
                  {
                    $listoProcesos = true;
                    $idProceso = $row['IdProceso'];
                    array_push($arreglo[count($arreglo)-1]['Procesos'],$row['Proceso']);
                  }
                }
                else{
                  $listoProcesos = false;
                  $idProceso = $row['IdProceso'];
                  $arreglo[]=array(
                    "Id" => $row['Id'],
                    "Actividad" => $row['Actividad'],
                    "Rutinario" => $row['Rutinario'],
                    "Foto" => $row['Foto'],
                    "Procesos" => array($row['Proceso']),
                    "Consecuencias" => array($row['Consecuencia']),
                    "Administrativo" => $row['Administrativo'],
                    "Descripcion" => $row['Descripcion'],
                    );
                }
              }
              break;

            default:
                $this->querySql['query'] = '';
        }

        if($existen>0)
        {
          $this->content = $arreglo;
        }
        else
        {
          $this->content = 0;
        }
      }
      else
      {
        //echo  "error ejecucion--".$stmt->errorInfo();
        // print_r($stmt->errorInfo());
        $this->content = $stmt->errorInfo();
      }
      $stmt = NULL;
    }
}

$w = new nuevoPDO();

$respuesta = array(
    'contenido' => $w->content,
    'response' => $w->res,
    'post' => $_POST,
    'method' =>$req_method,
    'query' =>$w->resquery,
  );
// print_r($_POST);
echo json_encode($respuesta);

?>
