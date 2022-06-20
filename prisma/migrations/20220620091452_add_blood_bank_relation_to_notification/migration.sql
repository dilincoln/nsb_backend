-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "blood_bank_id" UUID;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_blood_bank_id_fkey" FOREIGN KEY ("blood_bank_id") REFERENCES "BloodBank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
