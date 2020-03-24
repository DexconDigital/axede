<?php 
// 901045092-1
// 02769875
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
          
          case 'proyecto':
            $this->querySql['query'] = '';
            if(!isset($_POST['idContrato'])){              
              $this->querySql['query'] .= 'INSERT INTO empresa_contratos (NoContrato, Detalle, NombreResponsable, CargoResponsable, CedulaResponsable, FechaInicio, FechaFinal) VALUES (:noContrato, :detalleContrato, :nombreResponsable, :cargoResponsable, :cedulaResponsable, :fechaInicio, :fechaFinal);';
              $this->querySql['query'] .= 'INSERT INTO proyectos (IdEmpresa, IdNorma, IdContrato, IdProfesionalCreador) VALUES (:idEmpresa, :idNorma, LAST_INSERT_ID(), :idProfesionalCreador);';
              array_push($arrayOptions,'idEmpresa','idNorma','noContrato','detalleContrato','nombreResponsable','cargoResponsable','cedulaResponsable','fechaInicio','fechaFinal','idProfesionalCreador');
            }
            else{
             $this->querySql['query'] .= 'INSERT INTO proyectos (IdEmpresa, IdNorma, IdContrato, IdProfesionalCreador) VALUES (:idEmpresa, :idNorma, :idContrato, :idProfesionalCreador);'; 
             array_push($arrayOptions,'idEmpresa','idNorma','idContrato','idProfesionalCreador');
            }
            

            $this->querySql['query'] .= 'INSERT INTO profesionalporproyecto (IdProyecto, IdProfesional) VALUES';
             //(:idEstudiante,:tipo,LAST_INSERT_ID());
            for ($i=0; $i < count($_POST['idProfesionalEncargado']); $i++) { 
              $idProfesionalEncargado = $_POST['idProfesionalEncargado'][$i];
              if($i > 0)
              $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(LAST_INSERT_ID(),$idProfesionalEncargado)";
            }
            
            break;
          
          case 'profesional':
            $this->querySql['query'] = 'INSERT INTO profesionales (Nombres, Cedula, Direccion, Telefono, Movil, Correo, Profesion, Rut, Especialidades) VALUES (:nombres, :cedula, :direccion, :telefono, :movil, :correo, :profesion, :rut, :especialidades);';
            array_push($arrayOptions,'nombres', 'cedula', 'direccion', 'telefono', 'movil', 'correo', 'profesion', 'rut', 'especialidades');
              break;
          
          case 'peligro':
            $this->querySql['query'] = 'INSERT INTO peligros (Descripcion, Clasificacion, Consecuencia, RequisitoLegal) VALUES (:descripcion, :clasificacion, :consecuencia, :requisitoLegal);';
            $this->querySql['query'] .= "SET @last_id = LAST_INSERT_ID();";
            $this->querySql['query'] .= 'INSERT INTO peligros_peorconsecuencia (Nombre, IdPeligro) VALUES';
             //(:idEstudiante,:tipo,LAST_INSERT_ID());
            for ($i=0; $i < count($_POST['peorConsecuencia']); $i++) { 
              $peor = $_POST['peorConsecuencia'][$i];
              if($i > 0)
              $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "('$peor',@last_id)";
            }
            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'INSERT INTO peligros_efectos (Nombre, IdPeligro) VALUES';
            for ($i=0; $i < count($_POST['efectos']); $i++) { 
              $efecto = $_POST['efectos'][$i];
              if($i > 0)
              $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "('$efecto',@last_id)";
            }
            array_push($arrayOptions,'descripcion', 'clasificacion', 'consecuencia', 'requisitoLegal');
              break;
          
          case 'gtcRiesgosEtapas':
            $this->querySql['query'] = 'INSERT INTO gtc_peligrosporetapa (IdEtapa, Actividad, Rutinario, IdPeligro, Deficiencia, Exposicion, Fuente, Medio, Individuo, NombreFuente, NombreMedio, NombreIndividuo, NoExpuestos, Foto) VALUES (:idEtapa, :actividad, :rutinario, :idPeligro, :deficiencia, :exposicion, :fuente, :medio, :individuo, :nombreFuente, :nombreMedio, :nombreIndividuo, :noExpuestos, :urlImagen);';
            $this->querySql['query'] .= 'INSERT INTO gtc_intervencion (IdPeligroEtapa) VALUES (LAST_INSERT_ID())';
            array_push($arrayOptions, 'idEtapa', 'actividad', 'rutinario', 'idPeligro', 'deficiencia', 'exposicion', 'fuente', 'medio', 'individuo', 'nombreFuente', 'nombreMedio', 'nombreIndividuo', 'noExpuestos', 'urlImagen');
              break;
          
          case 'gtcEtapa':
            $this->querySql['query'] = 'INSERT INTO gtc_etapas (IdProyecto) VALUES (:idProyecto);';
            $this->querySql['query'] .= "SET @last_id_etapa = LAST_INSERT_ID();";
            $this->querySql['query'] .= 'INSERT INTO gtc_procesosporetapa (IdEtapa,IdProceso) VALUES ';
            for ($k=0; $k < count($_POST['idProcesos']); $k++) { 
              $id = $_POST['idProcesos'][$k];
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(@last_id_etapa,'$id')";
            }
            $this->querySql['query'] .= ';';
            $this->querySql['query'] .= 'INSERT INTO gtc_zonasporetapa (IdEtapa,IdZona) VALUES ';
            for ($k=0; $k < count($_POST['idZonas']); $k++) { 
              $id = $_POST['idZonas'][$k];
              if($k > 0)
                $this->querySql['query'] .= ',';
              $this->querySql['query'] .= "(@last_id_etapa,'$id')";
            }
            array_push($arrayOptions,'idProyecto');
              break;
          
          case 'empresa':
            $this->querySql['query'] = "INSERT INTO empresas (Nombre, Direccion, Nit, DV, Telefono, IdDexcon, EmpleadosDirectos, EmpleadosIndirectos, Tipo, MacroprocesoEvaluacion) VALUES (:nombre, :direccion, :nit, :dv, :telefono, :idDexcon, :empleadosDirectos, :empleadosIndirectos, :tipo, :macroprocesoEvaluacion);";
            $this->querySql['query'] .= "SET @last_id_empresa = LAST_INSERT_ID();";
            $contactoNombre = $_POST['contacto']['Nombre'];
            $contactoTelefono = $_POST['contacto']['Telefono'];
            $contactoMovil = $_POST['contacto']['Movil'];
            $contactoCorreo = $_POST['contacto']['Correo'];
            $contactoCargo = $_POST['contacto']['Cargo'];
            $this->querySql['query'] .= "INSERT INTO empresa_contactos (Nombre, Telefono, Movil, Correo, Cargo, IdEmpresa) VALUES ('$contactoNombre', $contactoTelefono, '$contactoMovil', '$contactoCorreo', '$contactoCargo',  @last_id_empresa);";
            $this->querySql['query'] .= "INSERT INTO empresa_cantidadprocesos (IdEmpresa, IdTipo, Cantidad) VALUES (@last_id_empresa,1,0),(@last_id_empresa,2,0),(@last_id_empresa,3,0),(@last_id_empresa,4,0),(@last_id_empresa,5,0),(@last_id_empresa,6,0),(@last_id_empresa,7,0),(@last_id_empresa,8,0),(@last_id_empresa,9,0),(@last_id_empresa,10,0),(@last_id_empresa,11,0),(@last_id_empresa,12,0);";
            array_push($arrayOptions,'nombre','direccion','nit','dv','telefono','idDexcon','empleadosDirectos','empleadosIndirectos','tipo','macroprocesoEvaluacion');
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