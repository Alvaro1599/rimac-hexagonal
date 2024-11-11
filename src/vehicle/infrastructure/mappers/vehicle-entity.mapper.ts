import { IMapper } from './mapper'
import { Vehicle } from '../../domain/models/vehicle'
import { Vehicle as VehicleEntity } from '../entities/vehicle.entity'

export class VehicleEntityMapper implements IMapper<Partial<VehicleEntity>, Vehicle> {
  toDomainModel(vehicleEntity: VehicleEntity): Vehicle {
    const { model, vehicleClass, passengersQuantity, name } = vehicleEntity
    return new Vehicle({ model, vehicleClass, passengersQuantity, name })
  }

  toPersistenceEntity(vehicle: Vehicle): Partial<Vehicle> {
    const { model, vehicleClass, passengersQuantity, name } = vehicle
    return new VehicleEntity({ model, vehicleClass, passengersQuantity, name })
  }
}
