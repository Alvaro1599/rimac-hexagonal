import { IMapper } from './mapper'
import { Vehicle } from '../../domain/models/vehicle'
import { VehicleSpanish } from '../../domain/models/vehicle-spanish'
import { Vehicle as VehicleEntity } from '../entities/vehicle.entity'

export class VehicleEntityMapper implements IMapper<Partial<VehicleEntity>, Vehicle> {
  toDomainModel(vehicleEntity: VehicleEntity): Vehicle {
    const { id, model, vehicleClass, passengersQuantity, name } = vehicleEntity
    return new Vehicle({ id, model, vehicleClass, passengersQuantity, name })
  }

  toPersistenceEntity(vehicle: Vehicle): Vehicle {
    const { model, vehicleClass, passengersQuantity, name, id } = vehicle
    const entity = new VehicleEntity({
      id,
      model,
      vehicleClass,
      passengersQuantity,
      name
    })
    return new Vehicle(entity)
  }

  toSpanishModel(vehicle: Vehicle): VehicleSpanish {
    const { model, vehicleClass, passengersQuantity, name, id } = vehicle
    return new VehicleSpanish({
      model,
      vehicleClass,
      passengersQuantity,
      name,
      id
    })
  }
}
