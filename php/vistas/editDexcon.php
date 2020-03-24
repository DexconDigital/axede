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
      if($this->querySql['query'] != "")
      $this->executeQuery();  
    }

    private function createQuery(){
      $arrayOptions = array();

      switch ($_POST['get']) {
        
          case 'empresaDatos':
            $this->querySql['query'] = 'UPDATE empresas as c SET c.Nombre=:nombre, c.Direccion=:direccion, c.Nit=:nit, c.DV=:dv, c.Telefono=:telefono, c.IdDexcon=:idDexcon, c.EmpleadosDirectos=:empleadosDirectos, c.EmpleadosIndirectos=:empleadosIndirectos, c.Tipo=:tipo, c.MacroprocesoEvaluacion=:macroprocesoEvaluacion WHERE c.Id = :idEmpresa;';            
            $contactoNombre = $_POST['contacto']['Nombre'];
            $contactoTelefono = $_POST['contacto']['Telefono'];
            $contactoMovil = $_POST['contacto']['Movil'];
            $contactoCorreo = $_POST['contacto']['Correo'];
            $contactoCargo = $_POST['contacto']['Cargo'];
            $this->querySql['query'] .= "UPDATE empresa_contactos as c SET c.Nombre='$contactoNombre', c.Telefono='$contactoTelefono', c.Movil='$contactoMovil', c.Correo='$contactoCorreo', c.Cargo='$contactoCargo' WHERE c.IdEmpresa = :idEmpresa;";
            array_push($arrayOptions,'nombre','direccion','nit','dv','telefono','idDexcon','empleadosDirectos','empleadosIndirectos','tipo','macroprocesoEvaluacion','idEmpresa');
            break;

          case 'empresaProcesos':
            $this->querySql['query'] = "";
            if(isset($_POST['actualizar']))
              for ($j=0; $j < count($_POST['actualizar']); $j++) { 
                // print_r($_POST['actualizar'][$j]);
                $nombre = $_POST['actualizar'][$j]['Nombre'];
                $idPadre = $_POST['actualizar'][$j]['IdPadre'];
                $id = $_POST['actualizar'][$j]['Id'];
                $this->querySql['query'] .= "UPDATE empresa_procesos SET Nombre='$nombre', IdPadre=$idPadre WHERE Id=$id;";
              }

            if(isset($_POST['eliminar']))
              for ($j=0; $j < count($_POST['eliminar']); $j++) { 
                $id = $_POST['eliminar'][$j];
                $this->querySql['query'] .= "DELETE p1, p2 FROM empresa_procesos as p1 left join empresa_procesos as p2 on p1.Id = p2.IdPadre where p1.Id = $id or p1.IdPadre = $id;";
              }
            
            if(isset($_POST['nuevo']))
              for ($j=0; $j < count($_POST['nuevo']); $j++) { 
                $proceso = $_POST['nuevo'][$j];
                $tipo = $proceso['Tipo'];
                $nombre = $proceso['Nombre'];
                $idTipo = $proceso['IdTipo'];
                $idPadre = $proceso['IdPadre'];
                if($proceso['Tipo'] == 'Sub'){
                  $this->querySql['query'] .= "INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ('$nombre', :idEmpresa, $idTipo, $idPadre);";
                }
                elseif($proceso['Tipo'] == 'Pro'){
                  $this->querySql['query'] .= "INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ('$nombre', :idEmpresa, $idTipo, $idPadre);";
                  if(isset($proceso['Subprocesos'])){
                    $a = $proceso['Subprocesos'];
                    if(count($a>0)){
                      $this->querySql['query'] .= 'INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ';
                      for ($i=0; $i < count($a); $i++) { 
                        $idTipoSub = $proceso['IdSubprocesos'];
                        $nombreSub = $a[$i];
                        if($i > 0)
                          $this->querySql['query'] .= ',';
                        $this->querySql['query'] .= "('$nombreSub',:idEmpresa,$idTipoSub,LAST_INSERT_ID())";
                      }
                      $this->querySql['query'] .= ';';
                    }
                  }
                }
                elseif($proceso['Tipo'] == 'Macro'){
                  $this->querySql['query'] .= "INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ('$nombre',:idEmpresa,$idTipo,0);";
                  $this->querySql['query'] .= "SET @last_id_macroproceso = LAST_INSERT_ID();";
                  if(isset($proceso['Subprocesos'])){
                    $a = $proceso['Subprocesos'];
                    if(count($a>0)){
                      $this->querySql['query'] .= 'INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ';
                      for ($i=0; $i < count($a); $i++) { 
                        $idTipoSub = $proceso['IdSubprocesos'];
                        $nombreSub = $a[$i];
                        if($i > 0)
                          $this->querySql['query'] .= ',';
                        $this->querySql['query'] .= "('$nombreSub',:idEmpresa,$idTipoSub,@last_id_macroproceso)";
                      }
                      $this->querySql['query'] .= ';';
                    }
                  }
                  if(isset($proceso['Procesos'])){
                    $a = $proceso['Procesos'];
                    for ($i=0; $i < count($a); $i++) { 
                      $idTipoPro = $proceso['IdProcesos'];
                      $nombrePro = $a[$i]['Nombre'];
                      $this->querySql['query'] .= "INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ('$nombrePro',:idEmpresa,$idTipoPro,@last_id_macroproceso);";
                      if(isset($a[$i]['Subprocesos'])){
                        $b = $a[$i]['Subprocesos'];
                        if(count($b>0)){
                          $this->querySql['query'] .= 'INSERT INTO empresa_procesos (Nombre, IdEmpresa, IdTipo, IdPadre) VALUES ';
                          for ($k=0; $k < count($b); $k++) { 
                            $idTipoSub = $proceso['IdSubprocesos'];
                            $nombreSub = $b[$k];
                            if($k > 0)
                              $this->querySql['query'] .= ',';
                            $this->querySql['query'] .= "('$nombreSub',:idEmpresa,$idTipoSub,LAST_INSERT_ID())";
                          }
                          $this->querySql['query'] .= ';';
                        }
                      } 
                    }
                  }
                }
              }

            if(isset($_POST['actualizarCantidad']))
              for ($j=0; $j < count($_POST['actualizarCantidad']); $j++) { 
              // print_r($_POST['actualizar'][$j]);
                $idTipo = $_POST['actualizarCantidad'][$j]['idTipo'];
                $cantidad = $_POST['actualizarCantidad'][$j]['cantidad'];
                $this->querySql['query'] .= "UPDATE empresa_cantidadprocesos SET Cantidad=$cantidad WHERE IdEmpresa=:idEmpresa and IdTipo=$idTipo;";
              }

            array_push($arrayOptions,'idEmpresa');
            break;

          case 'empresaZonas':
            $this->querySql['query'] = "";
            if(isset($_POST['actualizar']))
              for ($j=0; $j < count($_POST['actualizar']); $j++) { 
                // print_r($_POST['actualizar'][$j]);
                $nombre = $_POST['actualizar'][$j]['Nombre'];
                $id = $_POST['actualizar'][$j]['Id'];
                $this->querySql['query'] .= "UPDATE empresa_zonas SET Nombre='$nombre' WHERE Id=$id;";
              }

            if(isset($_POST['eliminar']))
              for ($j=0; $j < count($_POST['eliminar']); $j++) { 
                $id = $_POST['eliminar'][$j];
                $this->querySql['query'] .= "DELETE FROM empresa_zonas as z where z.Id = $id";
              }
            
            if(isset($_POST['nuevo']))
              for ($j=0; $j < count($_POST['nuevo']); $j++) { 
                $nombre = $_POST['nuevo'][$j]['Nombre'];
                $this->querySql['query'] .= "INSERT INTO empresa_zonas (Nombre, IdEmpresa) VALUES ('$nombre',:idEmpresa);";
              }

            array_push($arrayOptions,'idEmpresa');
            break;

          case 'profesional':
            $this->querySql['query'] = 'UPDATE profesionales SET Nombres=:nombres, Cedula=:cedula, Direccion=:direccion, Telefono=:telefono, Movil=:movil, Correo=:correo, Profesion=:profesion, Rut=:rut, Especialidades=:especialidades WHERE Id = :id';
            array_push($arrayOptions,'id','nombres', 'cedula', 'direccion', 'telefono', 'movil', 'correo', 'profesion', 'rut', 'especialidades');
            break;

          case 'peligro':
            $this->querySql['query'] = "DELETE From peligros_efectos where IdPeligro = :id;";
            $this->querySql['query'] .= "DELETE From peligros_peorconsecuencia where IdPeligro = :id;";
            $this->querySql['query'] .= 'INSERT INTO peligros_peorconsecuencia (Nombre, IdPeligro) VALUES';
             //(:idEstudiante,:tipo,LAST_INSERT_ID());
            for ($i=0; $i < count($_POST['peorConsecuencia']); $i++) { 
              $peor = $_POST['peorConsecuencia'][$i];
              if($i > 0)
              $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "('$peor',:id)";
            }
            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'INSERT INTO peligros_efectos (Nombre, IdPeligro) VALUES';
            for ($i=0; $i < count($_POST['efectos']); $i++) { 
              $efecto = $_POST['efectos'][$i];
              if($i > 0)
              $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "('$efecto',:id)";
            }
            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'UPDATE peligros SET Descripcion=:descripcion, Clasificacion=:clasificacion, Consecuencia=:consecuencia, RequisitoLegal=:requisitoLegal WHERE Id = :id';

            array_push($arrayOptions,'id','descripcion', 'clasificacion', 'consecuencia','requisitoLegal');
            break;

          case 'gtcEtapa':
            $this->querySql['query'] = "DELETE From gtc_procesosporetapa where IdEtapa = :idEtapa;";
            $this->querySql['query'] .= "DELETE From gtc_zonasporetapa where IdEtapa = :idEtapa;";

            $this->querySql['query'] .= 'INSERT INTO gtc_procesosporetapa (IdEtapa,IdProceso) VALUES ';
            for ($k=0; $k < count($_POST['idProcesos']); $k++) { 
              $id = $_POST['idProcesos'][$k];
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(:idEtapa,'$id')";
            }
            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'INSERT INTO gtc_zonasporetapa (IdEtapa,IdZona) VALUES ';
            for ($k=0; $k < count($_POST['idZonas']); $k++) { 
              $id = $_POST['idZonas'][$k];
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(:idEtapa,'$id')";
            }
            array_push($arrayOptions,'idEtapa');
            break;

          case 'gtcRiesgosEtapas':
            $this->querySql['query'] = "UPDATE gtc_peligrosporetapa SET Actividad=:actividad, Rutinario=:rutinario, Deficiencia=:deficiencia ,Exposicion=:exposicion, Fuente=:fuente, Medio=:medio, Individuo=:individuo, NombreFuente=:nombreFuente, NombreMedio=:nombreMedio, NombreIndividuo=:nombreIndividuo, NoExpuestos=:noExpuestos, Foto=:foto";

            if($_POST['idAnterior'] != $_POST['idPeligro']){
              $this->querySql['query'] .= ", IdPeligro=:idPeligro";
              array_push($arrayOptions, 'idPeligro');
            }

            $this->querySql['query'] .= " WHERE IdEtapa=:idEtapa and IdPeligro=:idAnterior";
              array_push($arrayOptions, 'idEtapa', 'actividad', 'rutinario', 'idAnterior', 'deficiencia', 'exposicion', 'fuente', 'medio', 'individuo', 'nombreFuente', 'nombreMedio', 'nombreIndividuo', 'noExpuestos', 'foto');
            break;

          case 'gtcIntervencion':
            $this->querySql['query'] = 'UPDATE gtc_intervencion SET Eliminacion=:eliminacion, Sustitucion=:sustitucion, Ingenieria=:ingenieria, Administrativo=:administrativo, Epp=:epp, NombreEpp=:nombreEpp WHERE Id = :id';
            array_push($arrayOptions,'id','eliminacion', 'sustitucion', 'ingenieria', 'administrativo', 'epp', 'nombreEpp');
            break;

          case 'estrategiaMatrizAxiologica':
            $this->querySql['query'] = "DELETE From estrategia_principioscorporativos where IdProyecto = :idProyecto;";
            $this->querySql['query'] .= "DELETE From estrategia_gruposreferencia where IdProyecto = :idProyecto;";
            $this->querySql['query'] .= "DELETE From estrategia_matrizaxiologica where IdProyecto = :idProyecto;";

            $this->querySql['query'] .= 'INSERT INTO estrategia_principioscorporativos (IdProyecto,Nombre) VALUES ';
            for ($k=0; $k < count($_POST['principiosCorporativos']); $k++) { 
              $Nombre = $_POST['principiosCorporativos'][$k];
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(:idProyecto,'$Nombre')";
            }

            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'INSERT INTO estrategia_gruposreferencia (IdProyecto,Nombre) VALUES ';
            for ($k=0; $k < count($_POST['gruposReferencia']); $k++) { 
              $Nombre = $_POST['gruposReferencia'][$k];
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(:idProyecto,'$Nombre')";
            }

            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'INSERT INTO estrategia_matrizaxiologica (IdProyecto,Posicion,Value) VALUES ';
            $k = 0;
            foreach ($_POST['matriz'] as $key => $value) {
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(:idProyecto,'$key','$value')";
              $k++;
            }
            array_push($arrayOptions,'idProyecto');
            break;

          case 'estrategiaDiagnostico':
            $this->querySql['query'] = "";

            for ($i=0; $i < count($_POST['items']); $i++) { 
              $this->querySql['query'] .= "DELETE From estrategia_diagnostico where ItemPadre = ".$_POST['items'][$i]['IdItem'].";";
            }


            $queryA = 'INSERT INTO estrategia_diagnostico (Id, IdProyecto, Descripcion, FortalezaNivel, FortalezaImpacto, DebilidadNivel, DebilidadImpacto, ItemPadre) VALUES ';
            $cantidadQueryA = 0;
            $queryB = 'INSERT INTO estrategia_diagnostico (IdProyecto, Descripcion, FortalezaNivel, FortalezaImpacto, DebilidadNivel, DebilidadImpacto, ItemPadre) VALUES ';
            $cantidadQueryB = 0;
            // $this->querySql['query'] .= 'INSERT INTO estrategia_diagnostico (IdProyecto, Descripcion, FortalezaNivel, FortalezaImpacto, DebilidadNivel, DebilidadImpacto, ItemPadre) VALUES ';
            for ($i=0; $i < count($_POST['items']); $i++) { 
              $a = $_POST['items'];
              for ($j=0; $j < count($a[$i]['Descripciones']); $j++) { 
                $b = $a[$i]['Descripciones'][$j];
                $Descripcion = $b['Descripcion'];
                $FortalezaImpacto = $b['FortalezaImpacto'] != null?$b['FortalezaImpacto']:0;
                $FortalezaNivel = $b['FortalezaNivel'] != null?$b['FortalezaNivel']:0;
                $DebilidadNivel = $b['DebilidadNivel'] != null?$b['DebilidadNivel']:0;
                $DebilidadImpacto = $b['DebilidadImpacto'] != null?$b['DebilidadImpacto']:0;
                $IdPadre = $a[$i]['IdItem'];
                if($b['Id'] != null){
                  $id = $b['Id'];
                  if($cantidadQueryA > 0)
                    $queryA .= ',';
                  $cantidadQueryA ++;
                  $queryA .= "($id, :idProyecto, '$Descripcion', $FortalezaNivel, $FortalezaImpacto, $DebilidadNivel, $DebilidadImpacto,$IdPadre)";
                }
                else {
                  // $b = $a[$i]['Descripciones'][$j];
                  if($cantidadQueryB > 0)
                    $queryB .= ',';
                  $cantidadQueryB ++;
                  $queryB .= "(:idProyecto, '$Descripcion', $FortalezaNivel, $FortalezaImpacto, $DebilidadNivel, $DebilidadImpacto,$IdPadre)";
                } 
              }
            }
            if($cantidadQueryA > 0)
              $this->querySql['query'] .= $queryA.';';
            if($cantidadQueryB > 0)
              $this->querySql['query'] .= $queryB.';';

            array_push($arrayOptions,'idProyecto');
            break;

          case 'estrategiaAnalisisVulnerabilidad':
            $this->querySql['query'] = "";

            $this->querySql['query'] .= "DELETE From estrategia_analisisvulnerabilidad where IdProyecto = :idProyecto;";

            $queryA = 'INSERT INTO estrategia_analisisvulnerabilidad (Id, IdProyecto, Puntal, Amenaza, Consecuencia, Impacto, Probabilidad, Reaccion) VALUES ';
            $cantidadQueryA = 0;
            $queryB = 'INSERT INTO estrategia_analisisvulnerabilidad (IdProyecto, Puntal, Amenaza, Consecuencia, Impacto, Probabilidad, Reaccion) VALUES ';
            $cantidadQueryB = 0;
            // $this->querySql['query'] .= 'INSERT INTO estrategia_diagnostico (IdProyecto, Descripcion, FortalezaNivel, FortalezaImpacto, DebilidadNivel, DebilidadImpacto, ItemPadre) VALUES ';
            for ($i=0; $i < count($_POST['analisis']); $i++) { 
              $a = $_POST['analisis'][$i];
              $Puntal = $a['Puntal'];
              $Amenaza = $a['Amenaza'];
              $Consecuencia = $a['Consecuencia'];
              $Impacto = $a['Impacto'];
              $Probabilidad = $a['Probabilidad'];
              $Reaccion = $a['Reaccion'];
              if($a['Id'] != null){
                $id = $a['Id'];
                if($cantidadQueryA > 0)
                  $queryA .= ',';
                $cantidadQueryA ++;
                $queryA .= "($id, :idProyecto, '$Puntal', $Amenaza, $Consecuencia, $Impacto, $Probabilidad, $Reaccion)";
              }
              else {
                if($cantidadQueryB > 0)
                  $queryB .= ',';
                $cantidadQueryB ++;
                $queryB .= "(:idProyecto, '$Puntal', $Amenaza, $Consecuencia, $Impacto, $Probabilidad, $Reaccion)";
              } 
            }
            if($cantidadQueryA > 0)
              $this->querySql['query'] .= $queryA.';';
            if($cantidadQueryB > 0)
              $this->querySql['query'] .= $queryB.';';

            array_push($arrayOptions,'idProyecto');
            break;

          case 'estrategiaConductoresValor':
            $this->querySql['query'] = "";

            if(isset($_POST['borrar']) && count($_POST['borrar']) > 0){
              $this->querySql['query'] .= "DELETE From estrategia_conductoresvalor where Id IN (";              
              for ($i=0; $i < count($_POST['borrar']); $i++) { 
                $id = $_POST['borrar'][$i];
                $this->querySql['query'] .= "$id";
                if($i < count($_POST['borrar'])-1)
                  $this->querySql['query'] .= ",";
              }
              $this->querySql['query'] .= ");";
            }

            if(isset($_POST['editar']) && count($_POST['editar']) > 0){
              for ($i=0; $i < count($_POST['editar']); $i++) { 
                $conductorValor = $_POST['editar'][$i]['ConductorValor'];
                $id = $_POST['editar'][$i]['Id'];
                $this->querySql['query'] .= "UPDATE estrategia_conductoresvalor SET ConductorValor='$conductorValor' WHERE Id=$id;";              
              }
            }

            if(isset($_POST['nuevo']) && count($_POST['nuevo']) > 0){
              $this->querySql['query'] .= "INSERT INTO estrategia_conductoresvalor (IdProyecto, ConductorValor) VALUES ";
              for ($i=0; $i < count($_POST['nuevo']); $i++) { 
                $conductorValor = $_POST['nuevo'][$i]['ConductorValor'];
                $this->querySql['query'] .= "(:idProyecto, '$conductorValor')";
                if($i < count($_POST['nuevo'])-1)
                  $this->querySql['query'] .= ",";
              }
            }

            $this->querySql['query'] .= ";";

            array_push($arrayOptions,'idProyecto');
            break;

          case 'estrategiaPalancas':
            $this->querySql['query'] = "";

            if(isset($_POST['borrarIniciativa']) && count($_POST['borrarIniciativa']) > 0){
              $this->querySql['query'] .= "DELETE From estrategia_palancas where Id IN (";              
              for ($i=0; $i < count($_POST['borrarIniciativa']); $i++) { 
                $id = $_POST['borrarIniciativa'][$i];
                $this->querySql['query'] .= "$id";
                if($i < count($_POST['borrarIniciativa'])-1)
                  $this->querySql['query'] .= ",";
              }
              $this->querySql['query'] .= ");";
            }

            if(isset($_POST['editar']) && count($_POST['editar']) > 0){
              for ($i=0; $i < count($_POST['editar']); $i++) { 
                $palanca = $_POST['editar'][$i]['Palanca'];
                $id = $_POST['editar'][$i]['Id'];
                $this->querySql['query'] .= "UPDATE estrategia_palancas SET Palanca='$palanca' WHERE Id=$id;";              
              }
            }

            if(isset($_POST['nuevo']) && count($_POST['nuevo']) > 0){
              $this->querySql['query'] .= "INSERT INTO estrategia_palancas (IdConductor, Palanca) VALUES ";
              for ($i=0; $i < count($_POST['nuevo']); $i++) { 
                $palanca = $_POST['nuevo'][$i]['Palanca'];
                $idConductor = $_POST['nuevo'][$i]['IdConductor'];
                $this->querySql['query'] .= "($idConductor, '$palanca')";
                if($i < count($_POST['nuevo'])-1)
                  $this->querySql['query'] .= ",";
              }
            }

            $this->querySql['query'] .= ";";
            break;

          case 'estrategiaEstrategias':
            $this->querySql['query'] = "";

            if(isset($_POST['borrar']) && count($_POST['borrar']) > 0){
              $this->querySql['query'] .= "DELETE From estrategia_estrategia where Id IN (";              
              for ($i=0; $i < count($_POST['borrar']); $i++) { 
                $id = $_POST['borrar'][$i];
                $this->querySql['query'] .= "$id";
                if($i < count($_POST['borrar'])-1)
                  $this->querySql['query'] .= ",";
              }
              $this->querySql['query'] .= ");";
            }

            if(isset($_POST['editar']) && count($_POST['editar']) > 0){
              for ($i=0; $i < count($_POST['editar']); $i++) { 
                $estrategia = $_POST['editar'][$i]['Estrategia'];
                $tipo = $_POST['editar'][$i]['Tipo'];
                $id = $_POST['editar'][$i]['Id'];
                $this->querySql['query'] .= "UPDATE estrategia_estrategia SET Estrategia='$estrategia', IdTipo='$tipo' WHERE Id=$id;";              
              }
            }

            if(isset($_POST['nuevo']) && count($_POST['nuevo']) > 0){
              $this->querySql['query'] .= "INSERT INTO estrategia_estrategia (IdPalanca, IdTipo, Estrategia) VALUES ";
              for ($i=0; $i < count($_POST['nuevo']); $i++) { 
                $estrategia = $_POST['nuevo'][$i]['Estrategia'];
                $idConductor = $_POST['nuevo'][$i]['IdPalanca'];
                $tipo = $_POST['nuevo'][$i]['Tipo'];
                $this->querySql['query'] .= "($idConductor, '$tipo', '$estrategia')";
                if($i < count($_POST['nuevo'])-1)
                  $this->querySql['query'] .= ",";
              }
            }

            $this->querySql['query'] .= ";";
            break;

          case 'estrategiaIniciativas':
            $this->querySql['query'] = "";

            if(isset($_POST['borrarIniciativa']) && count($_POST['borrarIniciativa']) > 0){
              $this->querySql['query'] .= "DELETE From estrategia_iniciativa where Id IN (";              
              for ($i=0; $i < count($_POST['borrarIniciativa']); $i++) { 
                $id = $_POST['borrarIniciativa'][$i];
                $this->querySql['query'] .= "$id";
                if($i < count($_POST['borrarIniciativa'])-1)
                  $this->querySql['query'] .= ",";
              }
              $this->querySql['query'] .= ");";
            }

            if(isset($_POST['editarIniciativa']) && count($_POST['editarIniciativa']) > 0){
              for ($i=0; $i < count($_POST['editarIniciativa']); $i++) { 
                $iniciativa = $_POST['editarIniciativa'][$i][1];
                $id = $_POST['editarIniciativa'][$i][0];
                $this->querySql['query'] .= "UPDATE estrategia_iniciativa SET Iniciativa='$iniciativa' WHERE Id=$id;";              
              }
            }

            if(isset($_POST['nuevaIniciativa']) && count($_POST['nuevaIniciativa']) > 0){
              for ($i=0; $i < count($_POST['nuevaIniciativa']); $i++) { 
                $iniciativa = $_POST['nuevaIniciativa'][$i]['Iniciativa'];
                $idEstrategia = $_POST['nuevaIniciativa'][$i]['IdEstrategia'];
                $this->querySql['query'] .= "INSERT INTO estrategia_iniciativa (IdEstrategia, Iniciativa) VALUES ($idEstrategia, '$iniciativa');";
                $this->querySql['query'] .= "SET @last_id_macroproceso = LAST_INSERT_ID();";
                if(isset($_POST['nuevaIniciativa'][$i]['Actividades'])>0 && count($_POST['nuevaIniciativa'][$i]['Actividades'])>0){
                  $actividades = $_POST['nuevaIniciativa'][$i]['Actividades'];
                  $this->querySql['query'] .= "INSERT INTO estrategia_actividades (IdIniciativa, Actividad, Responsable, FechaInicio, FechaFinal, Recursos) VALUES ";
                  for ($j=0; $j < count($actividades); $j++) { 
                    $actividad = $actividades[$j]['Actividad'];
                    $responsable = $actividades[$j]['Responsable'];
                    $recursos = $actividades[$j]['Recursos'];
                    $inicio = $actividades[$j]['Inicio'];
                    $final = $actividades[$j]['Final'];
                    $this->querySql['query'] .= "(LAST_INSERT_ID(), '$actividad', '$responsable', '$inicio', '$final', '$recursos')";
                    if($j < count($actividades)-1)
                      $this->querySql['query'] .= ",";
                  }  
                  $this->querySql['query'] .= ";";
                }
              }
            }

            if(isset($_POST['borrarActividad']) && count($_POST['borrarActividad']) > 0){
              $this->querySql['query'] .= "DELETE From estrategia_actividades where Id IN (";              
              for ($i=0; $i < count($_POST['borrarActividad']); $i++) { 
                $id = $_POST['borrarActividad'][$i];
                $this->querySql['query'] .= "$id";
                if($i < count($_POST['borrarActividad'])-1)
                  $this->querySql['query'] .= ",";
              }
              $this->querySql['query'] .= ");";
            }

            if(isset($_POST['editarActividad']) && count($_POST['editarActividad']) > 0){
              for ($i=0; $i < count($_POST['editarActividad']); $i++) { 
                $actividad = $_POST['editar'][$i]['Actividad'];
                $responsable = $_POST['editar'][$i]['Responsable'];
                $inicio = $_POST['editar'][$i]['Inicio'];
                $final = $_POST['editar'][$i]['Final'];
                $recursos = $_POST['editar'][$i]['Recursos'];
                $id = $_POST['editar'][$i]['Id'];
                $this->querySql['query'] .= "UPDATE estrategia_actividades SET Actividad='$actividad',Responsable='$responsable',FechaInicio='$inicio',FechaFinal='$final',Recursos='$recursos' WHERE Id=$id;";
              }
            }

            if(isset($_POST['nuevaActividad']) && count($_POST['nuevaActividad']) > 0){
              $this->querySql['query'] .= "INSERT INTO estrategia_actividades (IdIniciativa, Actividad, Responsable, FechaInicio, FechaFinal, Recursos) VALUES ";
              for ($i=0; $i < count($_POST['nuevaActividad']); $i++) { 
                $idIniciativa = $_POST['nuevaActividad'][$i]['IdIniciativa'];
                $actividad = $_POST['nuevaActividad'][$i]['Actividad'];
                $responsable = $_POST['nuevaActividad'][$i]['Responsable'];
                $inicio = $_POST['nuevaActividad'][$i]['Inicio'];
                $final = $_POST['nuevaActividad'][$i]['Final'];
                $recursos = $_POST['nuevaActividad'][$i]['Recursos'];
                $this->querySql['query'] .= "($idIniciativa,'$actividad','$responsable','$inicio','$final','$recursos')";
                if($i < count($_POST['nuevaActividad'])-1)
                  $this->querySql['query'] .= ",";
              }
            }

            $this->querySql['query'] .= ";";
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
      // echo $this->resquery;
      $stmt = $this->db->prepare($this->querySql['query']);
      $this->res = $stmt->execute($this->options);
      if(!$this->res){
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